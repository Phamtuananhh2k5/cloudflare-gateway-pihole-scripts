import { requestGateway } from "./lib/helpers.js";

// Check all DNS policies/profiles
const endpoints = [
  { path: "/rules", desc: "Custom rules" },
  { path: "/policies", desc: "DNS policies" },
  { path: "/lists", desc: "All lists" },
  { path: "/categories", desc: "Categories" },
  { path: "/proxy_endpoints", desc: "Proxy endpoints" },
];

const DOMAIN = "cdn.bootcdn.net";

for (const ep of endpoints) {
  try {
    const data = await requestGateway(ep.path, { method: "GET" });
    console.log(`\n=== ${ep.desc} (${ep.path}) ===`);
    if (data.errors && data.errors.length > 0) {
      console.log("Error:", data.errors[0].message);
    } else if (data.result) {
      const results = Array.isArray(data.result) ? data.result : [data.result];
      console.log(`Count: ${results.length}`);
      // Just print first 3 items
      for (const r of results.slice(0, 3)) {
        if (typeof r === "object") {
          console.log(JSON.stringify({ name: r.name, action: r.action, enabled: r.enabled, id: r.id }, null, 2));
        }
      }
    } else {
      console.log("No result field:", JSON.stringify(data).substring(0, 200));
    }
  } catch (e) {
    console.log(`${ep.desc}: ${e.message.substring(0, 100)}`);
  }
}
