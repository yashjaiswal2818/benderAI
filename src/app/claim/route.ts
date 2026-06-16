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
