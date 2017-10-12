import Runner from "./Runner.js";

export default class Scraper
{
    constructor(){
        this.parsers = {};
        this.extractors = {};    
    }
    
    /**
     * Register a names parser, that can be referenced from the scrape definition.
     * A parser function will be given three paramers, the value, options and the
     * context.
     * 
     * @param {string} name
     * @param {function} parser
     * @param {boolean} override
     * @returns {void}
     */
    registerParser(name, parser, override)
    {
        override = override||false;
        if(this.parsers[name] && !override)
        {
            throw("Parser "+name+" already exists");
        }
        
        this.parsers[name] = parser; 
    }
    
    /**
     * Set an extractor. The extractor determines how to traverse and extract
     * nodes from a document.
     * 
     * @param {string} name
     * @param {function} extractor
     * @param {boolean} override
     * @returns {void}
     */
    registerExtractor(name, extractor, override)
    {
        
        override = override||false;
        if(this.extractors[name] && !override)
        {
            throw("Extractor " + name + " already exists");
        }
        
        this.extractors[name] = extractor; 
    }
    
    /**
     * 
     * @param {object} definition
     * @param {string} extractor
     * @param {object} document
     * @param {object} context
     * @returns {object}
     */
    scrape(definition, extractor, document, context)
    {
        var runner = this.create(definition, extractor);
        return runner.scrape(document, context);
    }
    
    /**
     * Create a scraper that can be reused with different documents but retains
     * the same definition.
     * 
     * @param {Object} definition
     * @param {string} extractor
     * @returns {Runner}
     */
    create(definition, extractor)
    {
        if(!definition)
        {
            throw ("Definition is not provided!");
        }
        
        if(!this.extractors[extractor])
        {
            throw ("Extractor " + name + " doesn't exists or is not registered");
        }
        
        return new Runner(definition, this.parsers, this.extractors[extractor]);
    }
};