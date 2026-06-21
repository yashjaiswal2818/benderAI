import { siteConfig } from "@/lib/config";

export type JoinedCount = {
  /** How many people have paid the $5 to join the waitlist. */
  joined: number;
  /** "polar" when counted live from paid orders, "manual" otherwise. */
  source: "polar" | "manual";
};

function polarBase() {
  return process.env.POLAR_SERVER === "production"
    ? "https://api.polar.sh"
    : "https://sandbox-api.polar.sh";
}

/**
 * How many people have joined the paid waitlist.
 *
 * Live mode: counts UNIQUE paying customers of the $5 waitlist product
 * (cached for 60s). Fallback: the hand-updated number in config. Any Polar
 * error falls back too — the page must never break because the counter can't
 * load. The waitlist is open (no cap), so this is pure social proof.
 */
export async function getJoinedCount(): Promise<JoinedCount> {
  const token = process.env.POLAR_ACCESS_TOKEN;
  const productId = process.env.POLAR_WAITLIST_PRODUCT_ID;

  let joined: number = siteConfig.waitlist.joinedManual;
  let source: JoinedCount["source"] = "manual";

  if (token && productId) {
    try {
      // Count UNIQUE customers, not raw orders: a one-time product can be
      // bought more than once by the same person (Polar doesn't block it),
      // and a repeat purchase shouldn't inflate the count. Page through the
      // orders and dedupe by customer.
      const customers = new Set<string>();
      const MAX_PAGES = 50; // 5,000 orders, a generous ceiling
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
      joined = customers.size;
      source = "polar";
    } catch {
      // keep the manual fallback
    }
  }

  return { joined: Math.max(0, joined), source };
}
