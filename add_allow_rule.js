import { requestGateway } from "./lib/helpers.js";

const DOMAIN = "cdn.bootcdn.net";
const RULE_NAME = "Allow cdn.bootcdn.net";

// Check if rule already exists
const { result: existingRules } = await requestGateway("/rules", { method: "GET" });
const existingRule = existingRules.find(r => r.name === RULE_NAME);

if (existingRule) {
  console.log(`Rule "${RULE_NAME}" already exists (id: ${existingRule.id}), skipping creation.`);
  process.exit(0);
}

// Get highest priority (lowest number) to ensure this rule runs first
const priorities = existingRules.map(r => r.priority || 100).filter(p => p != null);
const maxPriority = Math.min(...priorities, 100);
const newPriority = Math.max(maxPriority - 1, 0);

console.log(`Creating allow rule for ${DOMAIN} with priority ${newPriority}...`);

const result = await requestGateway("/rules", {
  method: "POST",
  body: JSON.stringify({
    name: RULE_NAME,
    description: `Allow access to ${DOMAIN}`,
    enabled: true,
    action: "allow",
    filters: ["dns"],
    traffic: `any(dns.domains[*] == "${DOMAIN}")`,
    priority: newPriority,
  }),
});

console.log(`Rule created successfully! Priority: ${newPriority}`);
