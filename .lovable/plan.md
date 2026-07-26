# Auth + OAuth-protected MCP for Veliq

Two-phase build. Phase 1 gives Veliq real user accounts and a `favorites` table. Phase 2 exposes an MCP server that external assistants (ChatGPT, Claude, Cursor) can connect to as a signed-in Veliq user.

## Phase 1 — Auth + favorites

### Backend (Lovable Cloud / Supabase)

Enable Lovable Cloud, then one migration:

- `profiles` table (`id` → `auth.users`, `full_name`, `avatar_url`, `phone`) with trigger to auto-create on signup. RLS: user reads/updates own row.
- `favorites` table (`user_id`, `vehicle_id` text, `created_at`, PK on both). RLS: user CRUDs own rows only. GRANTs to `authenticated`.
- No `user_roles` needed yet — MCP is per-user, no admin surface in this phase.
- Activate Supabase OAuth 2.1 authorization server (`supabase--configure_oauth_server`) — required by Phase 2, done now so the setting is live end-to-end.

Vehicles stay in `src/lib/veliq-data.ts` for now (no schema change). `vehicle_id` in favorites is the existing string slug like `toyota-corolla-2016`.

### Frontend

- `src/routes/auth.tsx` — email/password sign in + sign up + Google OAuth via `lovable.auth.signInWithOAuth("google", …)`. Also handles "forgot password" → email link → `/reset-password`.
- `src/routes/reset-password.tsx` — required companion; sets new password via `supabase.auth.updateUser`.
- `src/routes/_authenticated/route.tsx` — integration-managed gate (auto-generated on Cloud enable).
- `src/routes/_authenticated/favorites.tsx` — signed-in-only list of the user's saved cars, reusing the existing vehicle card look.
- `src/routes/[.]lovable.oauth.consent.tsx` — Supabase OAuth 2.1 consent screen (used by Phase 2). Redirects unauthenticated visitors to `/auth?next=…` and preserves the `next` param through email, password, and Google sign-in so the connector round-trip returns to the consent screen, not the homepage.
- `src/components/vehicles/FavoriteButton.tsx` — heart toggle. On signed-out click, redirects to `/auth`. On signed-in, upserts/deletes via a server fn.
- `src/components/home/Navbar.tsx` — add session-aware affordance: "Sign in" when signed out; avatar/menu with Favorites + Sign out when signed in. Required by Lovable auth rules; matches existing nav style.
- `src/routes/cars.$carId.tsx` — mount the FavoriteButton on the detail page.
- `src/routes/__root.tsx` — filtered `onAuthStateChange` subscriber (SIGNED_IN / SIGNED_OUT / USER_UPDATED only) → `router.invalidate()` and cache clear on sign-out.
- `src/start.ts` — append `attachSupabaseAuth` so protected server fns get the bearer token.

### Server functions

`src/lib/favorites.functions.ts` with `.middleware([requireSupabaseAuth])`:
- `listMyFavorites()` → `{ vehicle_id, created_at }[]`
- `addFavorite({ vehicle_id })`
- `removeFavorite({ vehicle_id })`
- `isFavorite({ vehicle_id })`

## Phase 2 — OAuth-protected MCP server

### Install & config

- `bun add @lovable.dev/mcp-js zod`
- Add `@lovable.dev/mcp-js` to `bunfig.toml` `minimumReleaseAgeExcludes`.
- Add `mcpPlugin()` to `vite.config.ts`. Mount at `/mcp` (this app publishes publicly).

### Files

- `src/lib/mcp/index.ts` — `defineMcp` with:
  - `auth: auth.oauth.issuer({ issuer: `https://${VITE_SUPABASE_PROJECT_ID}.supabase.co/auth/v1`, acceptedAudiences: "authenticated" })`
  - `instructions`: "Tools for browsing Veliq's Nigerian Tokunbo car catalog and managing your saved favorites as a signed-in Veliq user."
  - Tools list below.
  - No env reads or I/O at module top level (build-eval + Worker cold-start rule).

### Tools (all under `src/lib/mcp/tools/*.ts`)

Public catalog (no auth needed, but the MCP itself is OAuth-protected so callers are always signed in):
1. `search_vehicles` — filter by brand, body type, price range, year range, fuel, text query. Returns compact rows (id, name, price, year, body type, mileage).
2. `get_vehicle` — full details by id.
3. `list_brands` — brand names + counts.
4. `list_body_types` — categories + counts.
5. `compare_vehicles` — up to 3 ids, returns side-by-side spec table.

Per-user (uses `ctx.getUserId()` + `ctx.getToken()` forwarded to Supabase so RLS runs as that user):
6. `list_my_favorites` — vehicles the caller has saved, joined with catalog data.
7. `add_favorite` — `{ vehicle_id }`. `annotations.readOnlyHint: false`.
8. `remove_favorite` — `{ vehicle_id }`. `annotations.destructiveHint: true`.
9. `whoami` — returns `{ user_id, email }` from the verified token so assistants can confirm which account they're acting as.

Each per-user tool creates a per-request Supabase client with `Authorization: Bearer ${ctx.getToken()}` (never service role) so all RLS policies from Phase 1 apply automatically.

### Post-setup

- Add a small favicon (letter-mark "V" in Veliq red) since Lovable's connector list uses `/favicon.ico` as the MCP icon.
- Run `app_mcp_server--extract_mcp_manifest` after the entry is written.

### Post-publish steps for the user

Nothing manual for auth — Supabase OAuth 2.1 + DCR means ChatGPT/Claude/Cursor self-register. On first "Add to Veliq" they'll be bounced to `/auth`, sign in, land on the consent screen, approve, and the assistant is connected.

## Files created

- `supabase/migrations/<ts>_auth_and_favorites.sql`
- `src/routes/auth.tsx`, `reset-password.tsx`
- `src/routes/_authenticated/favorites.tsx`
- `src/routes/[.]lovable.oauth.consent.tsx`
- `src/components/vehicles/FavoriteButton.tsx`
- `src/lib/favorites.functions.ts`
- `src/lib/mcp/index.ts`
- `src/lib/mcp/tools/{search_vehicles,get_vehicle,list_brands,list_body_types,compare_vehicles,list_my_favorites,add_favorite,remove_favorite,whoami}.ts`
- `public/favicon.ico` (if missing)

## Files modified

- `vite.config.ts` — add `mcpPlugin()`
- `bunfig.toml` — extend `minimumReleaseAgeExcludes`
- `src/routes/__root.tsx` — auth state subscriber
- `src/components/home/Navbar.tsx` — session-aware auth affordance
- `src/routes/cars.$carId.tsx` — mount `FavoriteButton`
- `src/start.ts` — append `attachSupabaseAuth`

## Files unchanged

Everything else — `veliq-data.ts` still owns catalog data, Hero/Categories/Brands/FeaturedVehicles/compare/cars listing UI all unmodified.

## Assumptions I'm making (say if wrong)

1. **Google + email/password** for sign-in. Skip if you want email-only.
2. **Vehicles stay hardcoded** in `veliq-data.ts` for this phase — MCP tools read from that array. If you'd rather move vehicles to Supabase now, that's a separate migration and roughly doubles Phase 1's scope.
3. **Favorites use the existing string vehicle IDs** (e.g. `toyota-corolla-2016`) — no cascade deletes since vehicles aren't rows yet.
4. **Every MCP tool requires sign-in** (uniform OAuth on the whole server), even the public catalog ones. Simpler and clearer for assistants than mixing public + protected on one server.
