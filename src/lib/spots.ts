import { siteConfig } from "@/lib/config";

export type Spots = {
  claimed: number;
  total: number;
  left: number;
  soldOut: boolean;
  /** "polar" when counted live from paid orders, "manual" otherwise. */
  source: "polar" | "manual";
};

function polarBase() {
  return process.env.POLAR_SERVER === "production"
    ? "https://api.polar.sh"
    : "https://sandbox-api.polar.sh";
}

/**
 * How many of the 100 founding spots are gone.
 *
 * Live mode: counts paid Polar orders for the lifetime product (cached for
 * 60s). Fallback: the hand-updated number in config. Any Polar error falls
 * back too — the page must never break because the counter can't load.
 */
export async function getSpots(): Promise<Spots> {
  const total = siteConfig.offer.spotsTotal;
  const token = process.env.POLAR_ACCESS_TOKEN;
  const productId = process.env.POLAR_LIFETIME_PRODUCT_ID;

  let claimed: number = siteConfig.offer.spotsClaimedManual;
  let source: Spots["source"] = "manual";

  if (token && productId) {
    try {
      // Count UNIQUE customers, not raw orders. A one-time product can be
      // bought more than once by the same person (Polar doesn't block it), and
      // a double-purchase — or our own test orders — must not burn two of the
      // 100 founding spots. Page through the orders and dedupe by customer.
      // The 100-spot cap keeps this to ~1-2 pages in practice.
      const customers = new Set<string>();
      const MAX_PAGES = 10; // 1,000 orders — far beyond the 100-spot cap
      for (let page = 1; page <= MAX_PAGES; page++) {
        const res = await fetch(
          `${polarBase()}/v1/orders/?product_id=${encodeURIComponent(
            productId
          )}&limit=100&page=${page}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            next: { revalidate: 60 },
          }
        );
        if (!res.ok) {
          // First page failed → give up, use the manual fallback. A later page
          // failing → keep the customers already counted.
          if (page === 1) throw new Error(`Polar orders HTTP ${res.status}`);
          break;
        }
        const data = (await res.json()) as {
          items?: Array<{
            customer_id?: string;
            customer?: { id?: string; email?: string };
          }>;
          pagination?: { max_page?: number };
        };
        const items = data.items ?? [];
        for (const order of items) {
          const key =
            order.customer_id ?? order.customer?.id ?? order.customer?.email;
          if (key) customers.add(key);
        }
        const maxPage = data.pagination?.max_page ?? page;
        if (items.length < 100 || page >= maxPage) break;
      }
      claimed = customers.size;
      source = "polar";
    } catch {
      // keep the manual fallback
    }
  }

  claimed = Math.max(0, Math.min(claimed, total));
  return {
    claimed,
    total,
    left: total - claimed,
    soldOut: claimed >= total,
    source,
  };
}
