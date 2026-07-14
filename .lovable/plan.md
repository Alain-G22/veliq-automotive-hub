## Goal
Localize Veliq to the Nigerian Tokunbo market, wire the search + Featured Cars to shared real data, and make every homepage CTA land on a working page.

## Data model (single source of truth)
Rewrite `src/lib/veliq-data.ts` to expose one real vehicle list used by Home, `/cars`, and `/compare`:

```ts
Vehicle {
  id, name, brand, model, bodyType,
  year, fuel, transmission, mileage,
  priceNGN: number,  // for filtering/sorting
  price: string,     // formatted "₦18,500,000"
  image: string,     // AI-generated photorealistic
  badge?: string
}
```

~12 real Tokunbo cars (Corolla, Camry, Accord, RX350, Highlander, C300, X5, Elantra, Sportage, Altima, Venza, Sienna). Realistic Tokunbo price bands (e.g. Corolla ₦12–18M, Camry ₦18–28M, RX350 ₦45–65M, X5 ₦55–80M, C300 ₦28–45M, Highlander ₦35–55M, etc.). `brands` derived from the list; `categories` mapped from `bodyType`.

## Real images
Use `generate_image` (fast tier) to create one photorealistic exterior 3/4 shot per model into `src/assets/cars/<slug>.jpg`, plus refreshed category thumbnails. Reuse existing hero image. Batch in parallel.

## Homepage changes
- `Hero.tsx`: search bar becomes a real form. Brand dropdown from data. Add a "Body type" dropdown (SUV/Sedan/…) and a price range. On submit → `navigate({ to: "/cars", search: { brand, bodyType, maxPrice } })`. "Explore Cars" → `/cars`. "Compare Cars" → `/compare`.
- `FeaturedVehicles.tsx`: read from the shared list (first 6, or those flagged `featured: true`). Prices come from `vehicle.price` (already ₦). View Details → `/cars/$carId`. Compare → `/compare?add=<id>` (real route). Keep existing card design.
- `Categories.tsx` / `Brands.tsx`: link into `/cars?bodyType=…` / `/cars?brand=…`.
- Navbar links updated to real routes.

## New routes (typed, TanStack file-based)
- `src/routes/cars.tsx` — listing page. `validateSearch` with `zodValidator` + `fallback` for `brand`, `bodyType`, `q`, `maxPrice`, `sort`. Left filter sidebar + responsive card grid reusing the existing card visual. Empty state when filters match nothing. Sort by price/year.
- `src/routes/cars.$carId.tsx` — detail page. Gallery (single hero image), full specs table, "Add to Compare" button, related cars. 404 via `notFoundComponent` when id unknown.
- `src/routes/compare.tsx` — up to 3 cars. Reads `?ids=a,b,c` via `validateSearch`. Picker to add/remove cars from a `Select` populated by the shared list. Side-by-side spec table (price, year, fuel, transmission, mileage, body). Persist selection in the URL only (no storage).

Each new route gets its own `head()` with unique title/description/og tags.

## Wiring & button audit
Table used during implementation to verify every homepage CTA:

| Button              | Target                                           |
| ------------------- | ------------------------------------------------ |
| Explore Cars (hero) | `/cars`                                          |
| Compare Cars (hero) | `/compare`                                       |
| Search (hero)       | `/cars?brand=…&bodyType=…&maxPrice=…`            |
| Category card       | `/cars?bodyType=<slug>`                          |
| Brand chip          | `/cars?brand=<name>`                             |
| View Details        | `/cars/$carId`                                   |
| Compare (card)      | `/compare?ids=<id>` (appends to existing list)   |
| View all (featured) | `/cars`                                          |

All use `<Link to=…>` / `useNavigate` from `@tanstack/react-router` for type safety.

## Not touched
`Articles`, `Testimonials`, `Newsletter`, `WhyVeliq`, `Footer`, `Navbar` visuals, styles.css tokens, root error/notFound boundaries, sitemap route, error reporting. No backend / DB changes. Blog/About/Contact left out per your answer; footer links to them become inert anchors (no broken TanStack `<Link>`).

## Files
Created:
- `src/routes/cars.tsx`
- `src/routes/cars.$carId.tsx`
- `src/routes/compare.tsx`
- `src/assets/cars/*.jpg` (~12 generated images)

Edited:
- `src/lib/veliq-data.ts` — real cars, ₦ prices, brand/category derivation
- `src/components/home/Hero.tsx` — functional search → `/cars`
- `src/components/home/FeaturedVehicles.tsx` — read shared list, real routes
- `src/components/home/Categories.tsx`, `Brands.tsx`, `Navbar.tsx` — real links

`routeTree.gen.ts` auto-regenerates. No files deleted.

## Verification
1. `bun run build` succeeds (Vercel-compatible output).
2. Playwright script: load `/`, click each CTA, assert URL + rendered heading on `/cars`, `/cars/toyota-camry-2018`, `/compare?ids=…`. Submit hero search and confirm the filtered `/cars` result set.
