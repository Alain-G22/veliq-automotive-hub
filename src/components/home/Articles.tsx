import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/lib/veliq-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./Categories";

export function Articles() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" id="articles">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="From the blog"
          title="Latest Articles"
          description="Buying guides, reviews and advice to help you choose smarter."
        />
        <Button asChild variant="hero" className="hidden sm:inline-flex">
          <a href="/blog">
            All articles <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {articles.map((a, i) => (
          <motion.a
            key={a.id}
            href={`/blog/${a.id}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-elegant)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={a.image}
                alt={a.title}
                loading="lazy"
                width={800}
                height={600}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
                {a.category}
              </Badge>
            </div>
            <div className="p-5">
              <p className="text-xs text-muted-foreground">{a.readTime}</p>
              <h3 className="mt-2 text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                {a.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
