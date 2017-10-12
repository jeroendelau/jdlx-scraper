'use strict';

import scraper from "../dist/jdlx-scraper.js";

var overrideParser = () => {addParser(true)};
var addParser = function (override)
{
    scraper.registerParser("test", (val) => {
        return val + 1
    }, override)
}

var overrideExtractor = () => {addExtractor(true)};
var addExtractor = function (override)
{
    scraper.registerExtractor("test", (val) => {
        return val + 1
    }, override)
}

describe('Scraper, register parser', () => {
    it('should work', function () {
        addParser();
        expect(scraper.parsers.test).toBeDefined();
        expect(scraper.parsers.test(1)).toBe(2);
    });

    it('should throw error on duplicate', function () {
        expect(addParser).toThrow();
    });

    it('should not throw error on override', function () {
        expect(overrideParser).not.toThrow();
    });

});


describe('Scraper, register extractor', () => {
     it('should work', function () {
        addExtractor();
        expect(scraper.extractors.test).toBeDefined();
        expect(scraper.extractors.test(1)).toBe(2);
    });

    it('should throw error on duplicate', function () {
        expect(addExtractor).toThrow();
    });

    it('should not throw error on override', function () {
        expect(overrideExtractor).not.toThrow();
    });

});


describe('Scraper, test creating a scraper', () => {
    
     var createRunnerWithoutDefinition = () =>
     {
         scraper.create();
     };
     
     var createRunnerWithoutRunner = () =>
     {
         scraper.create({});
     };
     
      var createRunnerWithInvalid = () =>
     {
         scraper.create({}, "asd");
     };
     

    it('should throw error without definition', function () {
        expect(createRunnerWithoutDefinition).toThrow();
    });
    
    it('should throw error without extractor', function () {
        expect(createRunnerWithoutRunner).toThrow();
    });
    
    it('should throw error without invalid extractor', function () {
        expect(createRunnerWithInvalid).toThrow();
    });


});

