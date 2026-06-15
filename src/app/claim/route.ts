import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSpots } from "@/lib/spots";

export const runtime = "nodejs";

/**
 * The one canonical path to the $49 lifetime checkout.
 *
 * Signed-in visitors land here (directly, or via Clerk's post-sign-up
 * redirect) and get forwarded to the Polar checkout with their Clerk user
 * id attached, mirroring the main app's Pro checkout pattern. The main
 * app's Polar webhook grants the lifetime tier after payment.
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

  const successUrl = `${origin}/?claimed=1`;
  const checkout = `${base}?clerk_user_id=${encodeURIComponent(userId)}&success_url=${encodeURIComponent(successUrl)}`;
  return NextResponse.redirect(checkout);
}
