import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { brands } from "@/lib/veliq-data";
import { SectionHeading } from "./Categories";

export function Brands() {
  return (
    <section className="border-y border-border/60 bg-card/40 py-20" id="brands">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Trusted manufacturers"
          title="Popular Brands"
          description="Shop from the world's most loved automakers, all in one place."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {brands.map((brand, i) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              whileHover={{ y: -4 }}
            >
              <Link
                to="/cars"
                search={{ brand, bodyType: "", q: "", maxPrice: 0, sort: "featured" }}
                className="glass group flex h-24 items-center justify-center rounded-2xl border-border/60 transition-colors hover:border-primary/60"
              >
                <span className="text-lg font-semibold tracking-tight text-muted-foreground transition-colors group-hover:text-foreground">
                  {brand}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
