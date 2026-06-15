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
      const res = await fetch(
        `${polarBase()}/v1/orders/?product_id=${encodeURIComponent(productId)}&limit=1`,
        {
          headers: { Authorization: `Bearer ${token}` },
          next: { revalidate: 60 },
        }
      );
      if (res.ok) {
        const data = (await res.json()) as {
          pagination?: { total_count?: number };
        };
        if (typeof data.pagination?.total_count === "number") {
          claimed = data.pagination.total_count;
          source = "polar";
        }
      }
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
