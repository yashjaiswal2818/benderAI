import { NextResponse } from "next/server";
import { getSpots } from "@/lib/spots";

export const runtime = "nodejs";

/** Live "X of 100 claimed" data for the founding-deal counter. */
export async function GET() {
  const spots = await getSpots();
  return NextResponse.json(spots, {
    headers: { "Cache-Control": "public, max-age=30, stale-while-revalidate=60" },
  });
}
