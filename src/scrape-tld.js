const rp = require("request-promise");
const cheerio = require("cheerio");
const isThere = require("is-there");
const {default: to} = require("await-to-js");
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "data");
const url = "https://www.iana.org/domains/root/db";

async function scrapeTlds() {
    const [err, $] = await to(rp({
        uri: url,
        transform: (body) => cheerio.load(body)
    }));
    if (err) return console.error(err);

    // Data in the format {domain, type, sponsor, linkToIANA}
    const data = [];
    $("#tld-table tbody tr")
        .each((i, tr) => {
            const tldData = {};
            const tds = $(tr).find("td");

            // First td - domain name and link to IANA record info
            const $td1 = $($(tds).get(0));
            const linkToIANA = "https://www.iana.org" + $td1.find("a").attr("href");
            const domain = $td1.text().trim();

            // Second td - type
            const type = $($(tds).get(1)).text().trim().toLowerCase();

            // Third td - sponsor
            const sponsor = $($(tds).get(2)).text().trim();

            data.push({domain, linkToIANA, type, sponsor});
        });

    const types = [];
    const sponsors = [];
    for (const row of data) {
        if (!sponsors.includes(row.sponsor)) sponsors.push(row.sponsor);
        if (!types.includes(row.type)) types.push(row.type);
    }
    
    fs.writeFileSync(path.join(dataPath, "sponsors.json"), JSON.stringify(sponsors));
    fs.writeFileSync(path.join(dataPath, "types.json"), JSON.stringify(types));
    fs.writeFileSync(path.join(dataPath, "tlds.json"), JSON.stringify(data));
}


if (!isThere(dataPath)) fs.mkdirSync(dataPath);
scrapeTlds().catch(console.error);
