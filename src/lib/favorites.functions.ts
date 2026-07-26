import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const VehicleIdInput = z.object({ vehicle_id: z.string().min(1).max(200) });

export const listMyFavorites = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("favorites")
      .select("vehicle_id, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const addFavorite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => VehicleIdInput.parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("favorites")
      .insert({ user_id: context.userId, vehicle_id: data.vehicle_id });
    // Duplicate insert is fine — the user was already fav'd.
    if (error && error.code !== "23505") throw new Error(error.message);
    return { ok: true };
  });

export const removeFavorite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => VehicleIdInput.parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("favorites")
      .delete()
      .eq("user_id", context.userId)
      .eq("vehicle_id", data.vehicle_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const isFavorite = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => VehicleIdInput.parse(input))
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("favorites")
      .select("vehicle_id")
      .eq("user_id", context.userId)
      .eq("vehicle_id", data.vehicle_id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { favorited: !!row };
  });
