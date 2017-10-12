
/* global expect */

import scraper from "../dist/jdlx-scraper.js";

import basicDoc from "./testdocument/basic.js";
import basicDefs from "./definitions/basic.js";

import collectionDoc from "./testdocument/collection.js";
import collectionDefs from "./definitions/collection.js";

import macroDoc from "./testdocument/macros.js";
import macroDefs from "./definitions/macros.js";

describe('Runner with basic definitions ', () => {
     
    it('should find simple matches', function () {

        var result = scraper.scrape(basicDefs.minimal, "json", basicDoc);
        var expected = {
            "result" :{
                'testa': "abc",
                'testb': 2
            }
            
        };
        expect(result).toEqual(expected);
    });
    
     it('should be able to reorganize', function () {

        var result = scraper.scrape(basicDefs.reorganize, "json", basicDoc);
        var expected = {
             "result" :{
                'testa': "abc",
                'testa1': {
                    'testb': 2,
                    'testc': "cde"
                }
            }
        };
        expect(result).toEqual(expected);
    });


    it('should be able to find nested', function () {

        var result = scraper.scrape(basicDefs.nested, "json", basicDoc);
        var expected = {
             "result" :{
                'testa': "abc",
                'testb': 2,
                'testc': 'efg'
            }
        };
        expect(result).toEqual(expected);
    });
    
     it('should be able to run a macro', function () {

        var result = scraper.scrape(basicDefs.macro, "json", basicDoc);
        var expected =  {
            result :{
                'test': "2"
            }
        };
        expect(result).toEqual(expected);
        expect(result.result.test).toBe("2");
    });
    
    it('can have fallback definition', function () {

        var result = scraper.scrape(basicDefs.multi, "json", basicDoc);
        var expected =  {
            result :{
                'test': 2
            }
        };
        expect(result).toEqual(expected);
    });
    
});



describe('Documents with collections ', () => {
     
    it('should work with basic document', function () {

        var result = scraper.scrape(basicDefs.minimal, "json", collectionDoc);
        var expected = {
            "result" :{
                'testa': "abc",
                'testb': 2
            }
            
        };
        expect(result).toEqual(expected);
    });
    
   
    it('should be able to find nested', function () {

        var result = scraper.scrape(basicDefs.nested, "json", collectionDoc);
        var expected = {
             "result" :{
                'testa': "abc",
                'testb': 2,
                'testc': 'efg'
            }
        };
        expect(result).toEqual(expected);
    });
    
     it('should be able to run a macro', function () {

        var result = scraper.scrape(basicDefs.macro, "json", collectionDoc);
        var expected =  {
            result :{
                'test': "2"
            }
        };
        expect(result).toEqual(expected);
        expect(result.result.test).toBe("2");
    });
    
    
     it('should find collections', function () {

        var result = scraper.scrape(collectionDefs.getCollection, "json", collectionDoc);
        var expected =  {
            result :{
                'testa': [
                    {'testa': "cola1", 'testb': 21},
                    {'testa': "cola2", 'testb': 22},
                    {'testa': "cola3", 'testb': 23} 
                ]
            }
        };
        expect(result).toEqual(expected);
    });
    
     it('will return first element of array', function () {

        var result = scraper.scrape(collectionDefs.pickFirstCollection, "json", collectionDoc);
        console.log(result);
        var expected =  {
            result :{
                'testarray': "arra" 
            }
        };
        expect(result).toEqual(expected);
    });
    
    it('will return all element of array with the option all', function () {

        var result = scraper.scrape(collectionDefs.pickWholeCollection, "json", collectionDoc);
        console.log(result);
        var expected =  {
            result :{
                'testarray': ["arra", "arrb"] 
            }
        };
        expect(result).toEqual(expected);
    });


});

describe('Runner macro ability ', () => {
     
    it('should run a single macro', function () {

        var result = scraper.scrape(macroDefs.testSingle, "json", macroDoc);
        var expected = { "result" : "abc"};
        expect(result).toEqual(expected);
    });
    
    it('should run a single macro in array', function () {

        var result = scraper.scrape(macroDefs.testSingleWithArray, "json", macroDoc);
        var expected = { "result" : "abc"};
        expect(result).toEqual(expected);
    });
    
    it('should run multiple macros in array', function () {

        var result = scraper.scrape(macroDefs.testSequence, "json", macroDoc);
        var expected = { "result" : 12};
        expect(result).toEqual(expected);
    });
    
    it('should run macros with parameters', function () {

        var result = scraper.scrape(macroDefs.testWithParams, "json", macroDoc);
        var expected = { "result" : "14"};
        expect(result).toEqual(expected);
    });
    
    it('should run macros with sequence containing parameters', function () {

        var result = scraper.scrape(macroDefs.testWithParamsSequence, "json", macroDoc);
        var expected = { "result" : 14};
        expect(result).toEqual(expected);
    });
});








