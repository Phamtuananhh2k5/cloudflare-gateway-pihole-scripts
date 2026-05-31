import { requestGateway } from "./lib/helpers.js";

const DOMAIN = "cdn.bootcdn.net";
const RULE_NAME = "Allow cdn.bootcdn.net";

// Find existing rule
const { result: rules } = await requestGateway("/rules", { method: "GET" });
const rule = rules.find(r => r.name === RULE_NAME);

if (!rule) {
  console.log("Rule not found!");
  process.exit(1);
}

// Update with very high precedence
const result = await requestGateway(`/rules/${rule.id}`, {
  method: "PUT",
  body: JSON.stringify({
    name: RULE_NAME,
    description: `Allow access to ${DOMAIN}`,
    enabled: true,
    action: "allow",
    precedence: 999999,
    filters: ["dns"],
    traffic: `any(dns.domains[*] == "${DOMAIN}")`,
  }),
});

console.log("Rule updated with precedence 999999");
