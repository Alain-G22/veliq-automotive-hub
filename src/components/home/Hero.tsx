import { motion } from "framer-motion";
import { ArrowRight, GitCompare, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import heroCar from "@/assets/hero-car.jpg";
import { brands } from "@/lib/veliq-data";

const years = Array.from({ length: 10 }, (_, i) => `${2025 - i}`);
const models = ["Sedan", "SUV", "Coupe", "Hatchback", "Pickup", "Electric"];

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <img
        src={heroCar}
        alt="Premium luxury car at dusk on a reflective road"
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
            The premium way to find your car
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Find Your Next Car <span className="text-primary">With Confidence</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Discover expert buying guides, compare vehicles, and explore the best cars for your
            budget.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild variant="premium" size="xl">
              <a href="/cars">
                Explore Cars <ArrowRight className="size-5" />
              </a>
            </Button>
            <Button asChild variant="hero" size="xl">
              <a href="/compare">
                <GitCompare className="size-5" /> Compare Cars
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Search */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="glass mt-12 grid max-w-4xl gap-3 rounded-2xl p-4 shadow-[var(--shadow-elegant)] sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]"
          onSubmit={(e) => e.preventDefault()}
        >
          <Field label="Brand">
            <Select>
              <SelectTrigger className="h-12 border-border/60 bg-background/40">
                <SelectValue placeholder="Any brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Model">
            <Select>
              <SelectTrigger className="h-12 border-border/60 bg-background/40">
                <SelectValue placeholder="Any model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Year">
            <Select>
              <SelectTrigger className="h-12 border-border/60 bg-background/40">
                <SelectValue placeholder="Any year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
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
