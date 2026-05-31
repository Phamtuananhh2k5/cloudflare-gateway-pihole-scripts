import { requestGateway } from "./lib/helpers.js";

// Try different category management endpoints
const endpoints = [
  "/policies",
  "/action_groups",
  "/category_policies",
  "/security_policies",
  "/dns/security_categories",
  "/categories/1/policies",
];

for (const ep of endpoints) {
  try {
    const data = await requestGateway(ep, { method: "GET" });
    console.log(`\n=== ${ep} ===`);
    if (data.errors && data.errors.length > 0) {
      console.log("Error:", data.errors[0].message);
    } else {
      const str = JSON.stringify(data).substring(0, 2000);
      console.log(str);
    }
  } catch (e) {
    console.log(`${ep}: ${e.message.substring(0, 100)}`);
  }
}
