import { defineTool } from "@lovable.dev/mcp-js";
import { categories, vehicles } from "@/lib/veliq-data";

export default defineTool({
  name: "list_body_types",
  title: "List body types",
  description: "List every vehicle body type/category with a count of available vehicles.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const rows = categories.map((c) => ({
      name: c.name,
      slug: c.slug,
      count: vehicles.filter((v) => v.bodyType === c.slug).length,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { body_types: rows },
    };
  },
});
