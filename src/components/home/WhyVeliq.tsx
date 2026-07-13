import { motion } from "framer-motion";
import { Star, Scale, Sparkles, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./Categories";

const features = [
  {
    icon: Star,
    title: "Expert Reviews",
    desc: "In-depth, road-tested reviews written by automotive specialists you can trust.",
  },
  {
    icon: Scale,
    title: "Honest Comparisons",
    desc: "Side-by-side breakdowns of price, performance and running costs — no bias.",
  },
  {
    icon: Sparkles,
    title: "AI Car Recommendations",
    desc: "Personalized picks matched to your budget and lifestyle.",
    soon: true,
  },
  {
    icon: ShieldCheck,
    title: "Trusted Information",
    desc: "Accurate, up-to-date specs and pricing sourced from verified data.",
  },
];

export function WhyVeliq() {
  return (
    <section className="border-y border-border/60 bg-card/40 py-20" id="why">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Veliq"
          title="Car buying, done properly"
          description="Everything you need to make a confident decision — in one premium platform."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass relative flex flex-col gap-4 rounded-2xl p-6"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <f.icon className="size-6" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  {f.soon && (
                    <Badge variant="outline" className="border-primary/50 text-primary">
                      Coming Soon
                    </Badge>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
