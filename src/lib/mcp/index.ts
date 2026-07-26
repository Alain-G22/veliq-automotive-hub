import { auth, defineMcp } from "@lovable.dev/mcp-js";
import searchVehicles from "./tools/search_vehicles";
import getVehicle from "./tools/get_vehicle";
import listBrands from "./tools/list_brands";
import listBodyTypes from "./tools/list_body_types";
import compareVehicles from "./tools/compare_vehicles";
import listMyFavorites from "./tools/list_my_favorites";
import addFavorite from "./tools/add_favorite";
import removeFavorite from "./tools/remove_favorite";
import whoami from "./tools/whoami";

// Direct Supabase issuer (never the .lovable.cloud proxy — mcp-js validates issuer RFC 8414).
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "veliq-mcp",
  title: "Veliq",
  version: "0.1.0",
  instructions:
    "Tools for browsing Veliq's Nigerian Tokunbo car catalog and managing the signed-in user's saved favorites. Use search_vehicles to explore listings, get_vehicle for full details, and the favorites tools to save cars the user is interested in.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    searchVehicles,
    getVehicle,
    listBrands,
    listBodyTypes,
    compareVehicles,
    listMyFavorites,
    addFavorite,
    removeFavorite,
    whoami,
  ],
});
