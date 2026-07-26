import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getVehicleById } from "@/lib/veliq-data";

export default defineTool({
  name: "get_vehicle",
  title: "Get vehicle details",
  description: "Fetch full details for one vehicle by its Veliq id (e.g. 'toyota-corolla-2016').",
  inputSchema: {
    vehicle_id: z.string().min(1).describe("Vehicle id / slug returned by search_vehicles."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ vehicle_id }) => {
    const v = getVehicleById(vehicle_id);
    if (!v) {
      return {
        content: [{ type: "text", text: `No vehicle found with id "${vehicle_id}".` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(v, null, 2) }],
      structuredContent: { vehicle: v },
    };
  },
});
