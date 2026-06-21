import { NextResponse } from "next/server";
import { getJoinedCount } from "@/lib/spots";

export const runtime = "nodejs";

/** Live "X people joined" data for the waitlist counter. */
export async function GET() {
  const count = await getJoinedCount();
  return NextResponse.json(count, {
    headers: { "Cache-Control": "public, max-age=30, stale-while-revalidate=60" },
  });
}
