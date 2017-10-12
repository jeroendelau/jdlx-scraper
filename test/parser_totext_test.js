'use strict';

import scraper from "../dist/jdlx-scraper.js";

describe('Test "toText"', () => {
    it('Output is not a number', function () {
        expect(scraper.parsers.toText(1)).not.toBe(1);
    });

    it('Convert number to text', function () {
        expect(scraper.parsers.toText(1)).toBe("1");
    });
});
