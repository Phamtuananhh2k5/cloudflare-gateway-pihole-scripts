import { requestGateway } from "./lib/helpers.js";

const endpoints = [
  "/configuration",
  "/audit_logs",
  "/listing_counts",
];

for (const ep of endpoints) {
  try {
    const data = await requestGateway(ep, { method: "GET" });
    console.log(`\n=== ${ep} ===`);
    if (data.errors && data.errors.length > 0) {
      console.log("Error:", data.errors[0].message);
    } else {
      console.log(JSON.stringify(data).substring(0, 2000));
    }
  } catch (e) {
    console.log(`${ep}: ${e.message.substring(0, 100)}`);
  }
}
