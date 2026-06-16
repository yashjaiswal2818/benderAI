import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getSpots } from "@/lib/spots";

export const runtime = "nodejs";

/**
 * The one canonical path to the $49 lifetime checkout.
 *
 * Signed-in visitors land here (directly, or via Clerk's post-sign-up
 * redirect) and get forwarded to the Polar checkout with their Clerk user
 * id attached, mirroring the main app's Pro checkout pattern. The main
 * app's Polar webhook grants the lifetime tier after payment.
 *
 * We pass two things on the checkout URL:
 *  - clerk_user_id: prefills the Polar `clerk_user_id` custom field (the
 *    primary, email-agnostic way the webhook resolves the buyer).
 *  - customer_email: prefills the checkout email with the buyer's Clerk
 *    email, so the webhook's email fallback also resolves correctly even if
 *    the custom field isn't present. Belt and suspenders.
 */
export async function GET(req: NextRequest) {
  const { userId } = await auth();
  const origin = req.nextUrl.origin;

  if (!userId) {
    return NextResponse.redirect(`${origin}/?signin=1`);
  }

  const spots = await getSpots();
  if (spots.soldOut) {
    return NextResponse.redirect(`${origin}/?soldout=1`);
  }

  // Don't let someone who already owns lifetime pay a second time. Polar won't
  // stop a repeat checkout, so we guard here. Fails OPEN: if the entitlement
  // service is unconfigured or unreachable, we proceed to checkout rather than
  // block a legitimate buyer.
  if (await alreadyOwnsLifetime(userId)) {
    return NextResponse.redirect(`${origin}/?owned=1`);
  }

  const base = process.env.NEXT_PUBLIC_POLAR_LIFETIME_CHECKOUT_URL;
  if (!base) {
    console.error("[claim] NEXT_PUBLIC_POLAR_LIFETIME_CHECKOUT_URL is not set");
    return NextResponse.redirect(`${origin}/?checkout=unavailable`);
  }

  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses?.[0]?.emailAddress;

  const params = new URLSearchParams({
    clerk_user_id: userId,
    success_url: `${origin}/?claimed=1`,
  });
  if (email) params.set("customer_email", email);

  return NextResponse.redirect(`${base}?${params.toString()}`);
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
    const res = await fetch(
      `${url}?clerk_user_id=${encodeURIComponent(userId)}`,
      {
        headers: secret ? { Authorization: `Bearer ${secret}` } : undefined,
        cache: "no-store",
        signal: AbortSignal.timeout(3000),
      }
    );
    if (!res.ok) return false;
    const data = (await res.json()) as { tier?: string; lifetime?: boolean };
    return data.lifetime === true || data.tier === "LIFETIME";
  } catch {
    return false;
  }
}
