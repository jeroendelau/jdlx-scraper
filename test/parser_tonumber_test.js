'use strict';

import scraper from "../dist/jdlx-scraper.js";

describe('Test "toNumber"', () => {
    it('Output is not a string', function () {
        expect(scraper.parsers.toNumber("1")).not.toBe("1");
    });

    it('Convert text to number', function () {
        expect(scraper.parsers.toNumber("1")).toBe(1);
    });
});
