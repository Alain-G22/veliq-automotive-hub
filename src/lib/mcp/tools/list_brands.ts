import { defineTool } from "@lovable.dev/mcp-js";
import { vehicles, brands } from "@/lib/veliq-data";

export default defineTool({
  name: "list_brands",
  title: "List brands",
  description: "List every car brand in Veliq's catalog with a count of available vehicles.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const rows = brands.map((brand) => ({
      brand,
      count: vehicles.filter((v) => v.brand === brand).length,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { brands: rows },
    };
  },
});
