import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    toast.success("You're subscribed! Welcome to Veliq.");
    setEmail("");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" id="newsletter">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-border/60 p-8 text-center shadow-[var(--shadow-elegant)] sm:p-14"
        style={{ backgroundImage: "var(--gradient-primary)" }}
      >
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary-foreground/15 text-primary-foreground">
          <Mail className="size-7" />
        </span>
        <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          Get the best car deals in your inbox
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
          Weekly buying guides, price drops and expert reviews. No spam, unsubscribe anytime.
        </p>

        <form
          onSubmit={submit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-12 border-transparent bg-background/90 text-foreground placeholder:text-muted-foreground"
          />
          <Button type="submit" size="lg" className="h-12 bg-background text-foreground hover:bg-background/90">
            {done ? (
              <>
                <CheckCircle2 className="size-5" /> Subscribed
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      </motion.div>
    </section>
  );
}
