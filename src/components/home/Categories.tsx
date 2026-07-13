import { motion } from "framer-motion";
import { Car, CarFront, Gem, Truck, Zap, type LucideIcon } from "lucide-react";
import { categories } from "@/lib/veliq-data";

const icons: Record<string, LucideIcon> = { Car, CarFront, Gem, Truck, Zap };

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl ${className}`}
    >
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-muted-foreground">{description}</p>}
    </motion.div>
  );
}

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" id="categories">
      <SectionHeading
        eyebrow="Browse by type"
        title="Featured Categories"
        description="Explore vehicles curated by body style, from rugged pickups to refined luxury."
      />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat, i) => {
          const Icon = icons[cat.icon] ?? Car;
          return (
            <motion.a
              key={cat.name}
              href={`/cars?category=${cat.slug}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border/60"
            >
              <img
                src={cat.image}
                alt={`${cat.name} category`}
                loading="lazy"
                width={800}
                height={600}
                className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                className="absolute inset-0"
                style={{ backgroundImage: "var(--gradient-card)" }}
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/90 text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <span className="mt-2 text-base font-semibold">{cat.name}</span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
