import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Plus, X, GitCompare as GitCompareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { vehicles, getVehicleById, type Vehicle } from "@/lib/veliq-data";

const MAX = 3;

const searchSchema = z.object({
  ids: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/compare")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Compare Cars — Veliq Nigeria" },
      {
        name: "description",
        content:
          "Compare up to 3 Tokunbo cars side by side — price in Naira, year, mileage, transmission and more.",
      },
      { property: "og:title", content: "Compare Cars — Veliq Nigeria" },
      {
        property: "og:description",
        content: "Side-by-side comparison of Tokunbo cars available in Nigeria.",
      },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  const { ids } = Route.useSearch();
  const navigate = useNavigate({ from: "/compare" });

  const idList = ids
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean)
    .slice(0, MAX);

  const selected = idList
    .map((id: string) => getVehicleById(id))
    .filter((v: Vehicle | undefined): v is Vehicle => Boolean(v));

  const setIds = (next: string[]) => {
    navigate({ search: { ids: next.join(",") } });
  };

  const removeAt = (idx: number) => {
    const next = [...idList];
    next.splice(idx, 1);
    setIds(next);
  };

  const addId = (id: string) => {
    if (idList.includes(id) || idList.length >= MAX) return;
    setIds([...idList, id]);
  };

  const slots: (Vehicle | null)[] = [...selected];
  while (slots.length < MAX) slots.push(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Compare Cars</h1>
            <p className="mt-2 text-muted-foreground">
              Pick up to {MAX} Tokunbo cars to compare specs and pricing side by side.
            </p>
          </div>
          {selected.length > 0 && (
            <Button variant="outline" size="sm" onClick={() => setIds([])}>
              Reset comparison
            </Button>
          )}
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {slots.map((v, i) => (
            <div
              key={i}
              className="glass rounded-2xl border border-border/60 p-5"
            >
              {v ? (
                <>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                    <img
                      src={v.image}
                      alt={v.name}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                    <button
                      onClick={() => removeAt(i)}
                      aria-label={`Remove ${v.name}`}
                      className="glass absolute right-2 top-2 flex size-8 items-center justify-center rounded-full"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{v.name}</h3>
                  <p className="mt-1 text-xl font-bold text-primary">{v.price}</p>

                  <dl className="mt-4 space-y-2 text-sm">
                    <SpecRow label="Brand" value={v.brand} />
                    <SpecRow label="Body Type" value={v.bodyType} />
                    <SpecRow label="Year" value={`${v.year}`} />
                    <SpecRow label="Fuel" value={v.fuel} />
                    <SpecRow label="Transmission" value={v.transmission} />
                    <SpecRow label="Mileage" value={v.mileage} />
                  </dl>

                  <Button asChild variant="outline" size="sm" className="mt-4 w-full">
                    <Link to="/cars/$carId" params={{ carId: v.id }}>
                      View details
                    </Link>
                  </Button>
                </>
              ) : (
                <EmptySlot
                  onAdd={addId}
                  excluded={idList}
                  disabled={idList.length >= MAX}
                />
              )}
            </div>
          ))}
        </div>

        {selected.length === 0 && (
          <div className="mt-10 text-center">
            <GitCompareIcon className="mx-auto size-10 text-muted-foreground" />
            <p className="mt-3 text-muted-foreground">
              No cars selected yet — pick one from the dropdown above or from{" "}
              <Link to="/cars" className="text-primary underline">
                the car listings
              </Link>
              .
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/50 py-1.5">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

function EmptySlot({
  onAdd,
  excluded,
  disabled,
}: {
  onAdd: (id: string) => void;
  excluded: string[];
  disabled: boolean;
}) {
  const available = vehicles.filter((v) => !excluded.includes(v.id));
  return (
    <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-border/60 p-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Plus className="size-6" />
      </div>
      <p className="text-sm text-muted-foreground">Add a car to compare</p>
      <Select
        onValueChange={(v) => onAdd(v)}
        disabled={disabled || available.length === 0}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a car" />
        </SelectTrigger>
        <SelectContent>
          {available.map((v) => (
            <SelectItem key={v.id} value={v.id}>
              {v.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
