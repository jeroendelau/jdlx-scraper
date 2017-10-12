
/**
 * Scrapes information from provided document using scrape definitions
 * The point is to create reusable scrape definitions that can be re-used
 * in different scenarios
 *
 * @module Scraper
 */

import Scraper from "./Scraper.js";
import Parsers from "./Parsers.js";
import JSON from "./JsonExtractor.js";


var scraper = new Scraper();
scraper.registerParser("toText", Parsers.toText);
scraper.registerParser("toNumber", Parsers.toNumber);
scraper.registerParser("toCurrency", Parsers.toCurrency);
scraper.registerParser("trim", Parsers.trim);
scraper.registerParser("match", Parsers.match);
scraper.registerParser("toAbsolute", Parsers.toAbsolute);

scraper.registerExtractor("json", JSON);

export default scraper;

