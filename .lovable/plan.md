## Goal
Expand the vehicle catalog from 10 to 30 by adding 20 real Tokunbo models commonly found in the Nigerian market, each with an AI-generated photorealistic exterior image and a realistic 2024/25 Naira price band.

## Cars to add (with target price bands + body type)
Popular picks (10):
1. Toyota Venza XLE 2015 — Crossover SUV — ₦18,500,000
2. Toyota Sienna XLE 2016 — Minivan (mapped to SUV) — ₦22,500,000
3. Toyota RAV4 XLE 2017 — SUV — ₦28,500,000
4. Lexus ES 350 2016 — Luxury Sedan — ₦32,000,000
5. Lexus GX 460 2015 — Luxury SUV — ₦58,000,000
6. Honda CR-V EX 2017 — SUV — ₦24,500,000
7. Honda Pilot EX-L 2016 — SUV — ₦27,500,000
8. Ford Edge SEL 2017 — SUV — ₦23,500,000
9. Range Rover Sport HSE 2015 — Luxury SUV — ₦68,000,000
10. Mercedes-Benz GLE 350 2017 — Luxury SUV — ₦48,500,000

Broad coverage (5):
11. Hyundai Santa Fe Sport 2017 — SUV — ₦21,500,000
12. Kia Sorento LX 2017 — SUV — ₦22,000,000
13. Nissan Rogue SV 2018 — SUV — ₦19,500,000
14. Toyota Tacoma TRD 2017 — Pickup — ₦42,000,000
15. Acura MDX SH-AWD 2016 — Luxury SUV — ₦33,500,000

Flagship expansion (5):
16. Mercedes-Benz G-Wagon G550 2018 — Luxury SUV — ₦185,000,000
17. BMW 5 Series 535i 2016 — Luxury Sedan — ₦28,500,000
18. Lexus LX 570 2016 — Luxury SUV — ₦95,000,000
19. Toyota Land Cruiser 2016 — SUV — ₦82,000,000
20. Tesla Model 3 Long Range 2020 — Electric Sedan — ₦45,000,000

All prices reflect current Nigerian foreign-used market bands.

## Implementation

### 1. Generate 20 images
Use `generate_image` (fast tier, 1600×1000) into `src/assets/cars/<slug>.jpg` in parallel batches. Cinematic exterior 3/4 shots matching the style of the existing 10 (neutral studio-ish backdrop, sharp lighting) so the grid stays visually consistent.

### 2. Extend `src/lib/veliq-data.ts`
Append 20 new entries to `rawVehicles` using the existing `Vehicle` shape (`id`, `name`, `brand`, `model`, `bodyType`, `year`, `fuel`, `transmission`, `mileage`, `priceNGN`, `image`, `badge?`, `featured?`, `description`). Existing `formatNaira`, `vehicles`, `featuredVehicles`, `brands`, and `getVehicleById` derivations pick everything up automatically — no consumer changes required.

Featured flag: keep the current 6 featured cars as-is; mark 2 new standouts (G-Wagon, Land Cruiser) as `featured: true` so the homepage stays balanced. Everything else surfaces via `/cars`.

Body type mapping: Sienna → SUV (no Minivan slug exists and adding one would require a new `Category`/image); Tesla → `Electric`; G-Wagon/LX570/Range Rover/GLE/ES350/MDX/535i → `Luxury`; Tacoma → `Pickup`; rest → `SUV`/`Sedan`.

### 3. Nothing else changes
- `Hero.tsx`, `FeaturedVehicles.tsx`, `Categories.tsx`, `Brands.tsx`, `Navbar.tsx` — untouched; they read from the shared list.
- `/cars`, `/cars/$carId`, `/compare` — untouched; filters/sort/detail work automatically. New brands (Ford, Range Rover, Acura, Tesla) appear in the brand filter dropdown via the existing `brands` derivation.
- No route changes, no schema changes, no styling changes.

## Files
Created:
- `src/assets/cars/venza.jpg`, `sienna.jpg`, `rav4.jpg`, `es350.jpg`, `gx460.jpg`, `crv.jpg`, `pilot.jpg`, `edge.jpg`, `range-rover-sport.jpg`, `gle350.jpg`, `santa-fe.jpg`, `sorento.jpg`, `rogue.jpg`, `tacoma.jpg`, `mdx.jpg`, `g-wagon.jpg`, `535i.jpg`, `lx570.jpg`, `land-cruiser.jpg`, `model-3.jpg` (20 total)

Edited:
- `src/lib/veliq-data.ts` — append 20 vehicle entries + imports

## Verification
`bun run build` succeeds; homepage/cars/compare all render with the expanded catalog; brand filter shows the new brands.
