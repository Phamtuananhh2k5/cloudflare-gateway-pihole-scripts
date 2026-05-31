import { requestGateway } from "./lib/helpers.js";

const { result: rules } = await requestGateway("/rules", { method: "GET" });
for (const r of rules) {
  if (r.name.includes("Allow") || r.name.includes("CGPS")) {
    console.log(`"${r.name}": precedence=${r.precedence}, action=${r.action}, enabled=${r.enabled}`);
  }
}
