import { requestGateway } from "./lib/helpers.js";

const check = async (path) => {
  try {
    const data = await requestGateway(path, { method: "GET" });
    console.log(`\n=== ${path} ===`);
    if (data.errors && data.errors.length > 0) {
      console.log("Error:", data.errors[0].message);
    } else {
      const str = JSON.stringify(data).substring(0, 3000);
      console.log(str);
    }
  } catch (e) {
    console.log(`${path}: ${e.message.substring(0, 100)}`);
  }
};

await check("/categories?filter=all");
// Try account-level firewall/dns endpoints
await check("/policies/dns");
await check("/dns_policies");
await check("/firewall_policies");
await check("/lists/exports");
