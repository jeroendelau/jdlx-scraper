'use strict';

import scraper from "../dist/jdlx-scraper.js";

describe('Test "trim" functions', () => {
    it('Should remove "  "', function () {
        expect(scraper.parsers.trim("remove  space")).toEqual('remove space');
    });
    
    it('Should remove \\t', function () {
        expect(scraper.parsers.trim("remove\ttab")).toEqual('removetab');
    });
    
    it('Should remove \\n', function () {
        expect(scraper.parsers.trim("remove\nnewline")).toEqual('removenewline');
    });
    
    it('Should remove \\n and \\t and "  "', function () {
        expect(scraper.parsers.trim("remove \t\n\t all and some \n\n\t others")).toEqual('remove all and some others');
    });
    
    it('Should remove trailing spaces', function () {
        expect(scraper.parsers.trim("remove trailing   ")).toEqual('remove trailing');
    });
    
    it('Should remove leading spaces', function () {
        expect(scraper.parsers.trim("  remove leading")).toEqual('remove leading');
    });
});

