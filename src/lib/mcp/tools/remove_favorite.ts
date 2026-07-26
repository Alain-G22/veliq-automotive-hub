import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase-user";

export default defineTool({
  name: "remove_favorite",
  title: "Remove a car from favorites",
  description: "Remove a vehicle from the signed-in Veliq user's favorites.",
  inputSchema: {
    vehicle_id: z.string().min(1),
  },
  annotations: { readOnlyHint: false, destructiveHint: true, openWorldHint: false },
  handler: async ({ vehicle_id }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", ctx.getUserId()!)
      .eq("vehicle_id", vehicle_id);
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: `Removed "${vehicle_id}" from favorites.` }],
      structuredContent: { ok: true, vehicle_id },
    };
  },
});
