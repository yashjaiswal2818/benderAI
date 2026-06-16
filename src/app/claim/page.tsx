import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getSpots } from "@/lib/spots";
import { siteConfig } from "@/lib/config";
import { ClaimRedirect } from "./claim-redirect";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The one canonical path to the $49 lifetime checkout.
 *
 * This is a PAGE (not a route handler) on purpose. The final hop is a
 * cross-origin redirect to Polar, and a server 307 can't be followed by Next's
 * client-side (RSC) navigation — the browser blocks it as a CORS preflight
 * failure. So the same-origin outcomes use redirect(), but the external
 * checkout hop is done client-side via window.location (see ClaimRedirect),
 * which works no matter how the user reached /claim (Link click, Clerk
 * post-signup redirect, or a direct hit).
 *
 * We pass two things on the checkout URL:
 *  - clerk_user_id: prefills the Polar `clerk_user_id` custom field (the
 *    primary, email-agnostic way the webhook resolves the buyer).
 *  - customer_email: prefills the email so the webhook's email fallback also
 *    resolves correctly. Belt and suspenders.
 */
export default async function ClaimPage() {
  const { userId } = await auth();
  if (!userId) redirect("/?signin=1");

  const spots = await getSpots();
  if (spots.soldOut) redirect("/?soldout=1");

  // Don't let someone who already owns lifetime pay a second time. Polar won't
  // stop a repeat checkout, so we guard here. Fails open (see helper).
  if (await alreadyOwnsLifetime(userId)) redirect("/?owned=1");

  const base = process.env.NEXT_PUBLIC_POLAR_LIFETIME_CHECKOUT_URL;
  if (!base) {
    console.error("[claim] NEXT_PUBLIC_POLAR_LIFETIME_CHECKOUT_URL is not set");
    redirect("/?checkout=unavailable");
  }

  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses?.[0]?.emailAddress;

  const params = new URLSearchParams({
    clerk_user_id: userId,
    success_url: `${siteConfig.url}/?claimed=1`,
  });
  if (email) params.set("customer_email", email);

  return <ClaimRedirect url={`${base}?${params.toString()}`} />;
}

/**
 * Asks the main app whether this Clerk user already has lifetime access, so we
 * never send an existing owner back through checkout.
 *
 * Configured via ENTITLEMENT_CHECK_URL (e.g. https://benderai.app/api/
 * entitlement) and an optional ENTITLEMENT_CHECK_SECRET bearer token. The
 * endpoint is expected to accept ?clerk_user_id=… and return JSON shaped like
 * { tier: "LIFETIME" | "PRO" | "FREE", lifetime?: boolean }.
 *
 * Fails OPEN on every uncertainty (unset URL, non-200, timeout, bad JSON):
 * blocking a paying customer is far worse than the rare duplicate charge this
 * guards against.
 */
async function alreadyOwnsLifetime(userId: string): Promise<boolean> {
  const url = process.env.ENTITLEMENT_CHECK_URL;
  if (!url) return false;

  try {
    const secret = process.env.ENTITLEMENT_CHECK_SECRET;
    const res = await fetch(`${url}?clerk_user_id=${encodeURIComponent(userId)}`, {
      headers: secret ? { Authorization: `Bearer ${secret}` } : undefined,
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { tier?: string; lifetime?: boolean };
    return data.lifetime === true || data.tier === "LIFETIME";
  } catch {
    return false;
  }
}
