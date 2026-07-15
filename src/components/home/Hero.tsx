import { motion } from "framer-motion";
import { ArrowRight, GitCompare, Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import heroCar from "@/assets/hero-car.jpg";
import { brands, categories } from "@/lib/veliq-data";

const priceBands = [
  { label: "Any price", value: "0" },
  { label: "Under ₦15M", value: "15000000" },
  { label: "Under ₦25M", value: "25000000" },
  { label: "Under ₦40M", value: "40000000" },
  { label: "Under ₦60M", value: "60000000" },
];

export function Hero() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [maxPrice, setMaxPrice] = useState("0");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      to: "/cars",
      search: {
        brand,
        bodyType,
        maxPrice: Number(maxPrice) || 0,
        q: "",
        sort: "featured",
      },
    });
  };

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <img
        src={heroCar}
        alt="Mercedes-Benz G-Wagon parked against the Lagos skyline at night"
        width={1920}
        height={1088}
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "var(--gradient-hero)" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground">
            Nigeria's premium Tokunbo car marketplace
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Find Your Next Car <span className="text-primary">With Confidence</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Compare Tokunbo cars, real Naira prices and expert buying guides — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild variant="premium" size="xl">
              <Link to="/cars">
                Explore Cars <ArrowRight className="size-5" />
              </Link>
            </Button>
            <Button asChild variant="hero" size="xl">
              <Link to="/compare" search={{ ids: "" }}>
                <GitCompare className="size-5" /> Compare Cars
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          onSubmit={handleSearch}
          className="glass mt-12 grid max-w-4xl gap-3 rounded-2xl p-4 shadow-[var(--shadow-elegant)] sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]"
        >
          <Field label="Brand">
            <Select value={brand} onValueChange={(v) => setBrand(v === "all" ? "" : v)}>
              <SelectTrigger className="h-12 border-border/60 bg-background/40">
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
          </Field>
          <Field label="Body Type">
            <Select value={bodyType} onValueChange={(v) => setBodyType(v === "all" ? "" : v)}>
              <SelectTrigger className="h-12 border-border/60 bg-background/40">
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
          </Field>
          <Field label="Max Price">
            <Select value={maxPrice} onValueChange={setMaxPrice}>
              <SelectTrigger className="h-12 border-border/60 bg-background/40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priceBands.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <div className="flex items-end">
            <Button type="submit" variant="premium" size="lg" className="h-12 w-full lg:w-auto">
              <Search className="size-5" /> Search
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-left">
      <span className="px-1 text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
