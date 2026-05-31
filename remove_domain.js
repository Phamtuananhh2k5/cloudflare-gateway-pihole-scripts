import { getZeroTrustLists } from "./lib/api.js";
import { requestGateway } from "./lib/helpers.js";

const DOMAIN = "cdn.bootcdn.net";
const { result: lists } = await getZeroTrustLists();
const cgpsLists = lists.filter(l => l.name.startsWith("CGPS List"));

let removed = false;
for (const list of cgpsLists) {
  let page = 1;
  while (true) {
    const { result: items, result_info } = await requestGateway(`/lists/${list.id}/items?per_page=1000&page=${page}`, { method: "GET" });
    if (!items || items.length === 0) break;
    const match = items.find(i => i.value === DOMAIN);
    if (match) {
      console.log(`Found ${DOMAIN} in list "${list.name}" (id: ${list.id}), removing...`);
      await requestGateway(`/lists/${list.id}/items`, {
        method: "PATCH",
        body: JSON.stringify({
          remove: [{ value: DOMAIN }]
        }),
      });
      console.log("Removed successfully!");
      removed = true;
      break;
    }
    page++;
    if (result_info && page > Math.ceil(result_info.total_count / 1000)) break;
  }
  if (removed) break;
}

if (!removed) console.log(`Domain ${DOMAIN} not found in any CGPS list`);
console.log("Done");
