import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Fuel, Cog, Gauge, GitCompare, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { getVehicleById, vehicles } from "@/lib/veliq-data";

export const Route = createFileRoute("/cars/$carId")({
  loader: ({ params }) => {
    const vehicle = getVehicleById(params.carId);
    if (!vehicle) throw notFound();
    return { vehicle };
  },
  head: ({ loaderData }) => {
    const v = loaderData?.vehicle;
    if (!v) {
      return {
        meta: [
          { title: "Car not found — Veliq" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return {
      meta: [
        { title: `${v.name} — ${v.price} | Veliq Nigeria` },
        { name: "description", content: v.description },
        { property: "og:title", content: `${v.name} — ${v.price}` },
        { property: "og:description", content: v.description },
        { property: "og:image", content: v.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: v.image },
      ],
    };
  },
  notFoundComponent: CarNotFound,
  component: CarDetail,
});

function CarNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pt-32 pb-16 text-center">
        <Car className="mx-auto size-12 text-muted-foreground" />
        <h1 className="mt-4 text-3xl font-bold">Car not found</h1>
        <p className="mt-2 text-muted-foreground">
          The car you're looking for is no longer available or doesn't exist.
        </p>
        <Button asChild variant="premium" className="mt-6">
          <Link to="/cars">Browse all cars</Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
}

function CarDetail() {
  const { vehicle } = Route.useLoaderData();
  const related = vehicles
    .filter((v) => v.id !== vehicle.id && v.bodyType === vehicle.bodyType)
    .slice(0, 3);

  const specs = [
    { icon: Calendar, label: "Year", value: `${vehicle.year}` },
    { icon: Fuel, label: "Fuel", value: vehicle.fuel },
    { icon: Cog, label: "Transmission", value: vehicle.transmission },
    { icon: Gauge, label: "Mileage", value: vehicle.mileage },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <Link
          to="/cars"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to all cars
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-border/60">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              width={1200}
              height={750}
              className="size-full object-cover"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{vehicle.bodyType}</Badge>
              {vehicle.badge && (
                <Badge className="bg-primary text-primary-foreground">{vehicle.badge}</Badge>
              )}
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{vehicle.name}</h1>
            <p className="mt-2 text-3xl font-bold text-primary">{vehicle.price}</p>
            <p className="mt-4 text-muted-foreground">{vehicle.description}</p>

            <dl className="mt-8 grid grid-cols-2 gap-4">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-xl border border-border/60 p-4"
                >
                  <dt className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                    <s.icon className="size-3.5" /> {s.label}
                  </dt>
                  <dd className="mt-1 text-base font-semibold">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="premium" size="lg">
                <Link to="/compare" search={{ ids: vehicle.id }}>
                  <GitCompare className="size-5" /> Add to Compare
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/cars">See more cars</Link>
              </Button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold">Similar {vehicle.bodyType}s</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to="/cars/$carId"
                  params={{ carId: r.id }}
                  className="group overflow-hidden rounded-2xl border border-border/60 bg-card transition-transform hover:-translate-y-1"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.name}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{r.name}</h3>
                    <p className="mt-1 text-primary font-bold">{r.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
