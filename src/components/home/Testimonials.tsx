import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/veliq-data";
import { SectionHeading } from "./Categories";

export function Testimonials() {
  return (
    <section className="border-y border-border/60 bg-card/40 py-20" id="testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Loved by drivers"
          title="What our community says"
          description="Thousands of buyers trust Veliq to guide their next purchase."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="glass relative flex flex-col gap-4 rounded-2xl p-6"
            >
              <Quote className="size-8 text-primary/60" />
              <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="size-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-foreground/90">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-2">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
