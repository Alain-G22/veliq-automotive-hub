import { createFileRoute, Link, useRouter, useServerFn } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Heart } from "lucide-react";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { listMyFavorites, removeFavorite } from "@/lib/favorites.functions";
import { getVehicleById } from "@/lib/veliq-data";

export const Route = createFileRoute("/_authenticated/favorites")({
  head: () => ({
    meta: [
      { title: "Your saved cars — Veliq" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const router = useRouter();
  const list = useServerFn(listMyFavorites);
  const remove = useServerFn(removeFavorite);

  const { data, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => list(),
  });

  const vehicles = useMemo(
    () =>
      (data ?? [])
        .map((row) => getVehicleById(row.vehicle_id))
        .filter((v): v is NonNullable<ReturnType<typeof getVehicleById>> => !!v),
    [data],
  );

  async function handleRemove(vehicle_id: string) {
    await remove({ data: { vehicle_id } });
    router.invalidate();
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Heart className="size-6 fill-primary text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Your saved cars</h1>
        </div>

        {isLoading ? (
          <p className="mt-10 text-sm text-muted-foreground">Loading your favorites…</p>
        ) : vehicles.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-dashed border-border/60 p-12 text-center">
            <p className="text-muted-foreground">You haven't saved any cars yet.</p>
            <Button asChild variant="premium" className="mt-6">
              <Link to="/cars">Browse cars</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((v) => (
              <div
                key={v.id}
                className="group overflow-hidden rounded-2xl border border-border/60 bg-card"
              >
                <Link to="/cars/$carId" params={{ carId: v.id }} className="block">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={v.image}
                      alt={v.name}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link to="/cars/$carId" params={{ carId: v.id }}>
                    <h3 className="font-semibold hover:text-primary">{v.name}</h3>
                  </Link>
                  <p className="mt-1 text-primary font-bold">{v.price}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemove(v.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
