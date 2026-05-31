import { requestGateway } from "./lib/helpers.js";

const { result: rules } = await requestGateway("/rules", { method: "GET" });
for (const rule of rules) {
  console.log("---");
  console.log(JSON.stringify(rule, null, 2));
}
