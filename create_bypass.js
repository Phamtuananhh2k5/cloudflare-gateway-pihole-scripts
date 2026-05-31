import { requestGateway } from "./lib/helpers.js";

const DOMAIN = "cdn.bootcdn.net";
const RULE_NAME = "Bypass cdn.bootcdn.net";

// Delete old allow rule if exists
const { result: rules } = await requestGateway("/rules", { method: "GET" });
const oldRule = rules.find(r => r.name === "Allow cdn.bootcdn.net");
if (oldRule) {
  await requestGateway(`/rules/${oldRule.id}`, { method: "DELETE" });
  console.log("Deleted old allow rule");
}

// Create bypass rule with max precedence
const result = await requestGateway("/rules", {
  method: "POST",
  body: JSON.stringify({
    name: RULE_NAME,
    description: `Bypass security for ${DOMAIN}`,
    enabled: true,
    action: "allow",
    precedence: 999999,
    filters: ["dns"],
    traffic: `any(dns.domains[*] == "${DOMAIN}")`,
    rule_settings: {
      block_page_enabled: false,
      block_reason: "",
      bypass_children: true,
    },
  }),
});

console.log("Created bypass rule");
