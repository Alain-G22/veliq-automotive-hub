import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo } from "react";
import { Calendar, Fuel, Cog, Gauge, ArrowRight, GitCompare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { vehicles, brands, categories, type Vehicle } from "@/lib/veliq-data";

const searchSchema = z.object({
  brand: fallback(z.string(), "").default(""),
  bodyType: fallback(z.string(), "").default(""),
  q: fallback(z.string(), "").default(""),
  maxPrice: fallback(z.number(), 0).default(0),
  sort: fallback(z.string(), "featured").default("featured"),
});

export const Route = createFileRoute("/cars")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Browse Cars — Veliq Nigeria" },
      {
        name: "description",
        content:
          "Browse the latest Tokunbo cars for sale in Nigeria. Filter by brand, body type and price — all in Naira.",
      },
      { property: "og:title", content: "Browse Tokunbo Cars — Veliq Nigeria" },
      {
        property: "og:description",
        content: "Real Tokunbo listings with real Naira prices. Filter, compare and find your next car.",
      },
    ],
  }),
  component: CarsPage,
});

function CarsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/cars" });

  const filtered = useMemo(() => {
    let list: Vehicle[] = vehicles;
    if (search.brand) list = list.filter((v) => v.brand === search.brand);
    if (search.bodyType) list = list.filter((v) => v.bodyType === search.bodyType);
    if (search.q) {
      const q = search.q.toLowerCase();
      list = list.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.brand.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q),
      );
    }
    if (search.maxPrice > 0) list = list.filter((v) => v.priceNGN <= search.maxPrice);

    const sorted = [...list];
    if (search.sort === "price-asc") sorted.sort((a, b) => a.priceNGN - b.priceNGN);
    else if (search.sort === "price-desc") sorted.sort((a, b) => b.priceNGN - a.priceNGN);
    else if (search.sort === "year-desc") sorted.sort((a, b) => b.year - a.year);
    return sorted;
  }, [search]);

  const activeFilters = [
    search.brand && { key: "brand", label: `Brand: ${search.brand}` },
    search.bodyType && { key: "bodyType", label: `Type: ${search.bodyType}` },
    search.q && { key: "q", label: `Search: ${search.q}` },
    search.maxPrice > 0 && {
      key: "maxPrice",
      label: `Max: ₦${(search.maxPrice / 1_000_000).toFixed(1)}M`,
    },
  ].filter(Boolean) as { key: string; label: string }[];

  const clearFilter = (key: string) => {
    navigate({ search: (prev) => ({ ...prev, [key]: key === "maxPrice" ? 0 : "" }) });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Browse Cars</h1>
          <p className="mt-2 text-muted-foreground">
            {filtered.length} Tokunbo {filtered.length === 1 ? "car" : "cars"} available in Nigeria.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-6">
            <div className="glass rounded-2xl border border-border/60 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Filters
              </h2>

              <div className="mt-4 space-y-4">
                <FilterField label="Search">
                  <Input
                    placeholder="e.g. Camry"
                    value={search.q}
                    onChange={(e) =>
                      navigate({ search: (prev) => ({ ...prev, q: e.target.value }) })
                    }
                  />
                </FilterField>

                <FilterField label="Brand">
                  <Select
                    value={search.brand || "all"}
                    onValueChange={(v) =>
                      navigate({ search: (prev) => ({ ...prev, brand: v === "all" ? "" : v }) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any brand</SelectItem>
                      {brands.map((b) => (
                        <SelectItem key={b} value={b}>
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FilterField>

                <FilterField label="Body Type">
                  <Select
                    value={search.bodyType || "all"}
                    onValueChange={(v) =>
                      navigate({
                        search: (prev) => ({ ...prev, bodyType: v === "all" ? "" : v }),
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any type</SelectItem>
                      {categories.map((c) => (
                        <SelectItem key={c.slug} value={c.slug}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FilterField>

                <FilterField label="Max Price (₦M)">
                  <Input
                    type="number"
                    min={0}
                    placeholder="e.g. 30"
                    value={search.maxPrice ? search.maxPrice / 1_000_000 : ""}
                    onChange={(e) => {
                      const m = Number(e.target.value);
                      navigate({
                        search: (prev) => ({
                          ...prev,
                          maxPrice: isNaN(m) || m <= 0 ? 0 : m * 1_000_000,
                        }),
                      });
                    }}
                  />
                </FilterField>

                <FilterField label="Sort By">
                  <Select
                    value={search.sort}
                    onValueChange={(v) =>
                      navigate({ search: (prev) => ({ ...prev, sort: v }) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="year-desc">Newest Year</SelectItem>
                    </SelectContent>
                  </Select>
                </FilterField>

                {activeFilters.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      navigate({
                        search: { brand: "", bodyType: "", q: "", maxPrice: 0, sort: "featured" },
                      })
                    }
                  >
                    Clear all
                  </Button>
                )}
              </div>
            </div>
          </aside>

          <section>
            {activeFilters.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {activeFilters.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => clearFilter(f.key)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    {f.label}
                    <X className="size-3" />
                  </button>
                ))}
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="glass rounded-2xl border border-border/60 p-12 text-center">
                <h3 className="text-lg font-semibold">No cars match your filters</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try clearing a filter or broadening your search.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((v) => (
                  <CarCard key={v.id} vehicle={v} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function FilterField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function CarCard({ vehicle }: { vehicle: Vehicle }) {
  const specs = [
    { icon: Calendar, label: `${vehicle.year}` },
    { icon: Fuel, label: vehicle.fuel },
    { icon: Cog, label: vehicle.transmission },
    { icon: Gauge, label: vehicle.mileage },
  ];
  return (
    <article className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-elegant)] transition-transform hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          loading="lazy"
          width={800}
          height={500}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {vehicle.badge && (
          <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
            {vehicle.badge}
          </Badge>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-tight">{vehicle.name}</h3>
          <span className="whitespace-nowrap text-lg font-bold text-primary">{vehicle.price}</span>
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-muted-foreground">
          {specs.map((s) => (
            <li key={s.label} className="flex items-center gap-2">
              <s.icon className="size-4 text-primary/80" />
              {s.label}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex gap-2">
          <Button asChild variant="premium" size="sm" className="flex-1">
            <Link to="/cars/$carId" params={{ carId: vehicle.id }}>
              View Details <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link to="/compare" search={{ ids: vehicle.id }}>
              <GitCompare className="size-4" /> Compare
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
