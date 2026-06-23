/**
 * One-shot Polar setup for the $5 waitlist deal.
 *
 * Reads POLAR_ACCESS_TOKEN + POLAR_SERVER from .env.local, then:
 *   1. finds or creates the one-time $5 "Bender — Waitlist" product
 *   2. finds or creates a checkout link for it
 *   3. writes POLAR_WAITLIST_PRODUCT_ID and
 *      NEXT_PUBLIC_POLAR_WAITLIST_CHECKOUT_URL back into .env.local
 *
 * Usage:  node scripts/setup-polar.mjs
 *
 * Token scopes needed: products:read, products:write,
 * checkout_links:read, checkout_links:write, orders:read
 * (orders:read is what the live "joined" counter uses at runtime).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ENV_PATH = join(dirname(fileURLToPath(import.meta.url)), "..", ".env.local");

const PRODUCT_NAME = "Bender — Waitlist";
const PRODUCT_DESCRIPTION =
  "One-time $5 fee to join the Bender waitlist for early access to the " +
  "playground. Non-refundable commitment fee, not a deposit.";
const PRICE_USD_CENTS = 500;

function loadEnv() {
  const raw = readFileSync(ENV_PATH, "utf8");
  const env = {};
  for (const line of raw.split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) env[m[1]] = m[2].trim();
  }
  return { raw, env };
}

function saveEnv(raw, updates) {
  let next = raw;
  for (const [key, value] of Object.entries(updates)) {
    const re = new RegExp(`^${key}=.*$`, "m");
    next = re.test(next) ? next.replace(re, `${key}=${value}`) : next + `\n${key}=${value}\n`;
  }
  writeFileSync(ENV_PATH, next);
}

const { raw, env } = loadEnv();
const token = env.POLAR_ACCESS_TOKEN;
const server = env.POLAR_SERVER === "production" ? "production" : "sandbox";
const api = server === "production" ? "https://api.polar.sh" : "https://sandbox-api.polar.sh";
const dashboard = server === "production" ? "https://polar.sh" : "https://sandbox.polar.sh";
const appUrl = env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

if (!token) {
  console.error(`No POLAR_ACCESS_TOKEN in .env.local.

Create one at ${dashboard} → your org → Settings → Developers → New token,
with scopes: products:read, products:write, checkout_links:read,
checkout_links:write, orders:read — then paste it into .env.local and rerun.`);
  process.exit(1);
}

async function polar(path, init = {}) {
  const res = await fetch(`${api}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`${init.method ?? "GET"} ${path} → ${res.status}\n${JSON.stringify(body, null, 2)}`);
  }
  return body;
}

// 1. Sanity-check the token.
try {
  await polar("/v1/products/?limit=1");
} catch (err) {
  console.error(`Token rejected by the ${server} API (${api}).

If this is a fresh token, check it was created on the right environment —
sandbox tokens come from https://sandbox.polar.sh, production tokens from
https://polar.sh — and that POLAR_SERVER in .env.local matches.

${err.message}`);
  process.exit(1);
}

// 2. Find or create the product.
const existing = await polar(`/v1/products/?query=${encodeURIComponent("Waitlist")}&is_archived=false&limit=20`);
let product = (existing.items ?? []).find((p) => p.name === PRODUCT_NAME);

if (product) {
  console.log(`✓ Product already exists: ${product.name} (${product.id})`);
} else {
  product = await polar("/v1/products/", {
    method: "POST",
    body: JSON.stringify({
      name: PRODUCT_NAME,
      description: PRODUCT_DESCRIPTION,
      recurring_interval: null, // one-time purchase
      prices: [{ amount_type: "fixed", price_amount: PRICE_USD_CENTS, price_currency: "usd" }],
    }),
  });
  console.log(`✓ Created product: ${product.name} (${product.id})`);
}

// 3. Find or create a checkout link for it.
const links = await polar(`/v1/checkout-links/?product_id=${product.id}&limit=10`);
let link = (links.items ?? [])[0];

if (link) {
  console.log(`✓ Checkout link already exists: ${link.url}`);
} else {
  link = await polar("/v1/checkout-links/", {
    method: "POST",
    body: JSON.stringify({
      payment_processor: "stripe",
      products: [product.id],
      label: "Waitlist — $5 join",
      success_url: `${appUrl}/?claimed=1`,
      allow_discount_codes: false,
    }),
  });
  console.log(`✓ Created checkout link: ${link.url}`);
}

// 4. Write the results back into .env.local.
saveEnv(raw, {
  POLAR_WAITLIST_PRODUCT_ID: product.id,
  NEXT_PUBLIC_POLAR_WAITLIST_CHECKOUT_URL: link.url,
});

console.log(`
✓ .env.local updated:
  POLAR_WAITLIST_PRODUCT_ID=${product.id}
  NEXT_PUBLIC_POLAR_WAITLIST_CHECKOUT_URL=${link.url}

Environment: ${server} (${api})
Restart \`npm run dev\` to pick up the new values.`);
