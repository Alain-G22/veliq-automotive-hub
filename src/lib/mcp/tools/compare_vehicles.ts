import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getVehicleById } from "@/lib/veliq-data";

export default defineTool({
  name: "compare_vehicles",
  title: "Compare vehicles",
  description: "Side-by-side spec comparison of up to 3 vehicles by id.",
  inputSchema: {
    vehicle_ids: z.array(z.string().min(1)).min(2).max(3),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ vehicle_ids }) => {
    const found = vehicle_ids.map((id) => getVehicleById(id)).filter(Boolean);
    if (found.length !== vehicle_ids.length) {
      return {
        content: [{ type: "text", text: "One or more vehicle ids were not found." }],
        isError: true,
      };
    }
    const rows = found.map((v) => ({
      id: v!.id,
      name: v!.name,
      price: v!.price,
      price_ngn: v!.priceNGN,
      year: v!.year,
      body_type: v!.bodyType,
      fuel: v!.fuel,
      transmission: v!.transmission,
      mileage: v!.mileage,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { comparison: rows },
    };
  },
});
