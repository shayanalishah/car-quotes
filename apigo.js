export default function handler(req, res) {
const map = {
"go-car-quote-auto-insurance": "https://adswinleads.o18.link/c?o=21843210&m=21935&a=721565&aff_click_id={replace_it}&sub_aff_id={replace_it}",
"super-auto-budget": "https://adswinleads.o18.link/c?o=21812552&m=21935&a=721565&aff_click_id={replace_it}&sub_aff_id={replace_it}"
};

const id = req.query.id;
let dest = map[id];
if (!dest) return res.status(404).send("Unknown link id");

// Build click IDs (use ad_id/adset_id if present, else random)
const clickId = req.query.aff_click_id || req.query.ad_id || ("r" + Date.now().toString(36));
const subId = req.query.sub_aff_id || req.query.adset_id || req.query.campaign_id || clickId;

// Replace placeholders
dest = dest.replace(/{replace_it}/g, encodeURIComponent(clickId));
// If you ever use a different placeholder for sub, handle it here too:
// dest = dest.replace(/{sub_replace_it}/g, encodeURIComponent(subId));

// Carry through useful UTMs
const UTM_KEYS = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term","fbclid","gclid","msclkid","campaign_id","adset_id","ad_id","src"];
const u = new URL(dest);
u.searchParams.set("aff_click_id", clickId);
u.searchParams.set("sub_aff_id", subId);
for (const k of UTM_KEYS) if (req.query[k] && !u.searchParams.has(k)) u.searchParams.set(k, req.query[k]);

res.setHeader("Cache-Control","no-store");
res.setHeader("Referrer-Policy","no-referrer");
return res.redirect(302, u.toString());
}

Step 2) Update your search page to use the redirect
In search.html, change your result links to point to /api/go?id=... and open in the same tab.

Example for both links (replace your current <a> tags with these):

<!-- GO CAR QUOTE AUTO INSURANCE -->
<a class="result" href="/api/go?id=go-car-quote-auto-insurance" target="_self" rel="noreferrer">
<strong>Go Car Quote — Offer</strong>
<small>Auto insurance quote — affiliate link</small>
</a>

<!-- Super Auto Budget -->
<a class="result" href="/api/go?id=super-auto-budget" target="_self" rel="noreferrer">
<strong>Super Auto Budget — Offer</strong>
<small>Auto budget deal — affiliate link</small>
</a>