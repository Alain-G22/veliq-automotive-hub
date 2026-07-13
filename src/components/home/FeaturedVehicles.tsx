import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Fuel, Gauge, Cog, Heart, GitCompare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { featuredVehicles, type Vehicle } from "@/lib/veliq-data";
import { SectionHeading } from "./Categories";

function VehicleCard({ vehicle, index }: { vehicle: Vehicle; index: number }) {
  const [fav, setFav] = useState(false);
  const specs = [
    { icon: Calendar, label: `${vehicle.year}` },
    { icon: Fuel, label: vehicle.fuel },
    { icon: Cog, label: vehicle.transmission },
    { icon: Gauge, label: vehicle.mileage },
  ];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-elegant)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          loading="lazy"
          width={800}
          height={600}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {vehicle.badge && (
          <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
            {vehicle.badge}
          </Badge>
        )}
        <button
          onClick={() => setFav((v) => !v)}
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={fav}
          className="glass absolute right-3 top-3 flex size-9 items-center justify-center rounded-full transition-transform hover:scale-110"
        >
          <Heart className={`size-4 ${fav ? "fill-primary text-primary" : "text-foreground"}`} />
        </button>
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
            <a href={`/cars/${vehicle.id}`}>
              View Details <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="sm" className="flex-1">
            <a href={`/compare?add=${vehicle.id}`}>
              <GitCompare className="size-4" /> Compare
            </a>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedVehicles() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" id="featured">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Handpicked for you"
          title="Featured Vehicles"
          description="A curated selection of standout cars available right now."
        />
        <Button asChild variant="hero" className="hidden sm:inline-flex">
          <a href="/cars">
            View all <ArrowRight className="size-4" />
          </a>
        </Button>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredVehicles.map((v, i) => (
          <VehicleCard key={v.id} vehicle={v} index={i} />
        ))}
      </div>
    </section>
  );
}
