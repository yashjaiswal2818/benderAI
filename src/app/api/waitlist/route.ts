import { NextResponse } from "next/server"
import { rateLimit, clientIp } from "@/lib/rate-limit"

export const runtime = "nodejs"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// A waitlist signup is tiny JSON; anything larger is junk or abuse.
const MAX_BODY_BYTES = 1024

/**
 * Adds an email to the Bender launch list as a Resend contact.
 *
 * Set RESEND_API_KEY and RESEND_AUDIENCE_ID to go live. The contacts pile up
 * in the Resend audience; the single "we're live" email is sent later as a
 * Resend broadcast to that audience. Without the keys the route accepts
 * signups in development (so the form is testable) and returns a clear "not
 * configured" error in production.
 */
export async function POST(req: Request) {
  // Throttle per IP: this is the only public write endpoint, so without a
  // limit it can be used to exhaust the Resend quota or to probe which emails
  // are already on the list (the "already" response is an enumeration oracle).
  const rl = rateLimit(`waitlist:${clientIp(req)}`, { limit: 5, windowMs: 60_000 })
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    )
  }

  // Reject oversized bodies up front (defense in depth; the email length is
  // also capped below).
  const declaredLength = Number(req.headers.get("content-length") ?? 0)
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 413 }
    )
  }

  let email = ""
  try {
    const body = await req.json()
    email = String(body?.email ?? "")
      .trim()
      .toLowerCase()
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    )
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { ok: false, error: "That email doesn't look right." },
      { status: 422 }
    )
  }

  const key = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (!key || !audienceId) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[waitlist] RESEND_API_KEY / RESEND_AUDIENCE_ID not set — accepting signup in dev without storing it."
      )
      return NextResponse.json({ ok: true, status: "subscribed", dev: true })
    }
    return NextResponse.json(
      { ok: false, error: "The waitlist isn't open just yet. Try again soon." },
      { status: 503 }
    )
  }

  const base = `https://api.resend.com/audiences/${encodeURIComponent(audienceId)}/contacts`
  const auth = { Authorization: `Bearer ${key}` }

  try {
    // Resend's create-contact is idempotent (a repeat returns the same
    // contact with 200), so it can't tell us "already on the list". Check
    // first: a 200 here means the email is already subscribed.
    const existing = await fetch(`${base}/${encodeURIComponent(email)}`, {
      headers: auth,
    })
    if (existing.ok) {
      return NextResponse.json({ ok: true, status: "already" })
    }

    const res = await fetch(base, {
      method: "POST",
      headers: { ...auth, "Content-Type": "application/json" },
      body: JSON.stringify({ email, unsubscribed: false }),
    })

    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as {
        name?: string
        message?: string
      }
      console.error("[waitlist] Resend error", res.status, data)
      return NextResponse.json(
        { ok: false, error: "Something went wrong. Give it another go." },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true, status: "subscribed" })
  } catch (err) {
    console.error("[waitlist] network error", err)
    return NextResponse.json(
      { ok: false, error: "Couldn't reach the server. Check your connection." },
      { status: 502 }
    )
  }
}
