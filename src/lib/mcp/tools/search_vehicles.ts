import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { vehicles } from "@/lib/veliq-data";

export default defineTool({
  name: "search_vehicles",
  title: "Search vehicles",
  description:
    "Search Veliq's Nigerian Tokunbo car catalog. Filter by brand, body type, price range (Naira), year range, fuel, and free-text query. Returns compact listings.",
  inputSchema: {
    query: z.string().optional().describe("Free text to match against name/brand/model/description."),
    brand: z.string().optional().describe("Brand name, e.g. Toyota, Lexus."),
    body_type: z
      .enum(["Sedan", "SUV", "Luxury", "Hatchback", "Pickup", "Electric"])
      .optional(),
    fuel: z.enum(["Petrol", "Diesel", "Hybrid", "Electric"]).optional(),
    min_price_ngn: z.number().nonnegative().optional(),
    max_price_ngn: z.number().nonnegative().optional(),
    min_year: z.number().int().optional(),
    max_year: z.number().int().optional(),
    limit: z.number().int().min(1).max(50).optional().describe("Max results (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: (input) => {
    const q = input.query?.toLowerCase();
    const limit = input.limit ?? 20;
    const results = vehicles
      .filter((v) => {
        if (input.brand && v.brand.toLowerCase() !== input.brand.toLowerCase()) return false;
        if (input.body_type && v.bodyType !== input.body_type) return false;
        if (input.fuel && v.fuel !== input.fuel) return false;
        if (input.min_price_ngn && v.priceNGN < input.min_price_ngn) return false;
        if (input.max_price_ngn && v.priceNGN > input.max_price_ngn) return false;
        if (input.min_year && v.year < input.min_year) return false;
        if (input.max_year && v.year > input.max_year) return false;
        if (q) {
          const hay = `${v.name} ${v.brand} ${v.model} ${v.description}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      })
      .slice(0, limit)
      .map((v) => ({
        id: v.id,
        name: v.name,
        brand: v.brand,
        body_type: v.bodyType,
        year: v.year,
        price: v.price,
        price_ngn: v.priceNGN,
        mileage: v.mileage,
        fuel: v.fuel,
      }));
    return {
      content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
      structuredContent: { results, count: results.length },
    };
  },
});
