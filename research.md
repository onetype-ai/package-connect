# Research — Stripe on Connect

*July 2026. What connect needs so payments can build on top of it. Sources at the bottom.*

## What connect already has

- **Providers** (`connect.providers`) — declared with `auth: 'oauth2' | 'api_key'`, vault-backed env keys, `base` API url.
- **Connections** (`connect.connections`) — encrypted credentials in the `connections` table, decrypted only on the back through the `token` function; refresh/revoke lifecycle. The `link` command already stores api_key credentials directly.
- **Actions** (`connect.actions`) — typed input/output schemas, `execute` runs with a live token against the provider `base`. Any package calls them.

## Stripe provider

- `auth: 'api_key'` — no OAuth for our own account.
- The key should be a **Restricted API Key** (`rk_...`), not the full secret key. Stripe recommends least-privilege RAKs, especially for automated systems. The key description in the vault/provider should list the permissions the RAK needs (customers, products, prices, checkout sessions, billing meters, subscriptions, account links — read/write as needed).
- `base: 'https://api.stripe.com/v1'` — form-encoded bodies, `Authorization: Bearer rk_...`.

## Stripe Connect (billing your own clients) — important correction

- **OAuth for Connect is dead for new platforms.** Standard/Express account *types* are deprecated too. New integrations use the **Accounts API (v2)** with controller properties and configurable roles (Merchant / Customer / Recipient), plus **Account Links** — single-use hosted onboarding urls.
- Practically: a client account is created via API (`stripe:accounts:create`), onboarded via `stripe:account_links:create`, and afterwards we only hold the **account id** — not a token. Requests on behalf of the client are sent with the platform key plus the `Stripe-Account` header.
- Consequence: connect's oauth2 flow is NOT involved. Everything runs through the one platform api_key connection.

## Webhooks — the missing piece in connect

Connect is outbound-only today. Stripe (and every future provider) must call back in. Design constraints, dictated by Stripe verification:

1. **Raw body** — the signature (`Stripe-Signature` header, HMAC-SHA256 over `timestamp.payload`) verifies against the exact raw bytes. Parsing the JSON first breaks it. The framework HTTP server must hand the webhook route the untouched body — verify this exists before building.
2. **Timestamp tolerance** — reject signatures older than ~5 minutes (replay protection).
3. **Idempotency by event id** — Stripe redelivers; connect must remember processed event ids and skip duplicates.
4. **Fast 2xx** — persist/queue, respond, process async. Slow handlers cause retries and false failures.

Proposed shape:

- Provider declares `webhook: { verify: (raw, headers, secret) => event | null }`.
- Connect exposes one endpoint per provider: `POST /api/connect/webhook/:provider` (a `silent` command).
- On a verified event: dedupe by event id, then `onetype.Emit('connect.<provider>.event', { type, data, id })`.
- The signing secret lives in the vault (`STRIPE_WEBHOOK_SECRET`), separate from the API key.

## Actions payments will need

| Action | Purpose |
| --- | --- |
| `stripe:customers:create/get` | one Stripe customer per member/workspace |
| `stripe:checkout:create` | hosted Checkout session (`mode=subscription`) |
| `stripe:portal:create` | hosted Customer Portal session url |
| `stripe:subscriptions:get/cancel` | subscription state |
| `stripe:meter_events:create` | usage reporting (Billing Meters) |
| `stripe:accounts:create`, `stripe:account_links:create` | client billing (Accounts v2) |

## Sources

- https://docs.stripe.com/connect/accounts
- https://docs.stripe.com/connect/oauth-changes-for-standard-platforms
- https://docs.stripe.com/connect/accounts-v2
- https://docs.stripe.com/webhooks
- https://docs.stripe.com/webhooks/signature
- https://docs.stripe.com/keys/restricted-api-keys
