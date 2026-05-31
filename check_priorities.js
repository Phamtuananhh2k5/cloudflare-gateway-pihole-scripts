import { requestGateway } from "./lib/helpers.js";

const { result: rules } = await requestGateway("/rules", { method: "GET" });
for (const rule of rules) {
  console.log(`"${rule.name}": priority=${rule.priority}, action=${rule.action}, enabled=${rule.enabled}`);
}
