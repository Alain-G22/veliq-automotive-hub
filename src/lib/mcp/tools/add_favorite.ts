import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase-user";
import { getVehicleById } from "@/lib/veliq-data";

export default defineTool({
  name: "add_favorite",
  title: "Save a car to favorites",
  description: "Save a vehicle to the signed-in Veliq user's favorites.",
  inputSchema: {
    vehicle_id: z.string().min(1).describe("Vehicle id / slug to save."),
  },
  annotations: { readOnlyHint: false, openWorldHint: false },
  handler: async ({ vehicle_id }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    if (!getVehicleById(vehicle_id)) {
      return { content: [{ type: "text", text: `Unknown vehicle id "${vehicle_id}"` }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { error } = await supabase
      .from("favorites")
      .insert({ user_id: ctx.getUserId()!, vehicle_id });
    if (error && error.code !== "23505") {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: `Saved "${vehicle_id}" to favorites.` }],
      structuredContent: { ok: true, vehicle_id },
    };
  },
});
