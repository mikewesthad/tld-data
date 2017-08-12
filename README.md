# Top Level Domain Scrapper

A scrapper to pull all the top level domains (.com, .us, etc) from the IANA's [Root Zone Database](https://www.iana.org/domains/root/db) and format the information in JSON.

## Data

There are three datasets in the data folder (collected on 08/12/17):

- tlds.json - array of data about each domain name, in following form:

```js
[
    {
        "domain": ".aws",
        "linkToIANA": "https://www.iana.org/domains/root/db/aws.html",
        "type": "generic",
        "sponsor": "Amazon Registry Services, Inc."
    },
    ...
]
```

- sponsors.json - unique array of all the domain name sponsoring organizations in data.json
- types.json - unique array of all the domain name types in data.json

## Usage

You can download the json files in data/ or access them via NPM:

```js
npm install tld-data
```

Then inside of a JS file:

```js
// Webpack (or other JS bundler that supports JSON importing)
import tlds from "tld-data/data/tlds";
import sponsors from "tld-data/data/sponsors";
import types from "tld-data/data/types";

// Node
const tlds = require("tld-data/data/tlds");
const sponsors = require("tld-data/data/sponsors");
const types = require("tld-data/data/types");
```

## Scrapping the Data

Make sure you have [node](https://nodejs.org/en/) installed. Download the repository, open a terminal in the tld-data folder and run:

```
npm install
npm run scrape
```