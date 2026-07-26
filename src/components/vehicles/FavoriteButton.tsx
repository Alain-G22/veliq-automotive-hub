import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { addFavorite, isFavorite, removeFavorite } from "@/lib/favorites.functions";

export function FavoriteButton({ vehicleId }: { vehicleId: string }) {
  const navigate = useNavigate();
  const check = useServerFn(isFavorite);
  const add = useServerFn(addFavorite);
  const remove = useServerFn(removeFavorite);

  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [favorited, setFavorited] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getSession().then(async ({ data }) => {
      if (cancelled) return;
      const hasSession = !!data.session;
      setSignedIn(hasSession);
      if (hasSession) {
        try {
          const res = await check({ data: { vehicle_id: vehicleId } });
          if (!cancelled) setFavorited(res.favorited);
        } catch {
          /* ignore */
        }
      }
    });
    return () => {
      cancelled = true;
    };
  }, [vehicleId, check]);

  async function handleClick() {
    if (!signedIn) {
      navigate({ to: "/auth", search: { next: window.location.pathname } });
      return;
    }
    setBusy(true);
    try {
      if (favorited) {
        await remove({ data: { vehicle_id: vehicleId } });
        setFavorited(false);
        toast.success("Removed from favorites");
      } else {
        await add({ data: { vehicle_id: vehicleId } });
        setFavorited(true);
        toast.success("Saved to favorites");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      type="button"
      variant={favorited ? "premium" : "outline"}
      size="lg"
      onClick={handleClick}
      disabled={busy}
    >
      <Heart className={`size-5 ${favorited ? "fill-current" : ""}`} />
      {favorited ? "Saved" : "Save"}
    </Button>
  );
}
