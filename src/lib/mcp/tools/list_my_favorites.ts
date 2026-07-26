import { defineTool } from "@lovable.dev/mcp-js";
import { supabaseForUser } from "../supabase-user";
import { getVehicleById } from "@/lib/veliq-data";

export default defineTool({
  name: "list_my_favorites",
  title: "List my saved cars",
  description: "List the vehicles the signed-in Veliq user has saved to favorites.",
  inputSchema: {},
  annotations: { readOnlyHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("favorites")
      .select("vehicle_id, created_at")
      .order("created_at", { ascending: false });
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    const rows = (data ?? [])
      .map((r) => {
        const v = getVehicleById(r.vehicle_id);
        return v
          ? { id: v.id, name: v.name, price: v.price, year: v.year, saved_at: r.created_at }
          : { id: r.vehicle_id, name: "(unknown)", saved_at: r.created_at };
      });
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { favorites: rows, count: rows.length },
    };
  },
});
