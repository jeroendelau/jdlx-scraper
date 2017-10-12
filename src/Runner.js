
/**
 * Scrapes information from provided document using scrape definitions
 * The point is to create reusable scrape definitions that can be re-used
 * in different scenarios
 *
 * @module Scraper
 */

export default class Runner
{

        /**
         * Create an scraper, this method can never
         * be called directly, as contains no detailed
         * instructions on how to retrieve data from a
         * document.
         *
         * The class needs to be extended to support it.
         *
         * @param {Object} definition
         * @param {Object} parsers
         * @param {Function} extractor
         */
        constructor(definition, parsers, extractor)
        {
            this.definition = definition;
            this.parsers = parsers;
            this.extractor = extractor;
        }

        /**
         * Scrape the provided document
         *
         * @param {type} document
         * @returns {Array|.Parser.prototype.parseNode.collection|undefined}
         */
        scrape(document, context)
        {
            //set context to default object
            context = context || {};
            return this.parseNode(document, this.definition, context);
        };

        parseNode(node, query, context)
        {
            //since all queries are repeatable, surround with array
            if (!Array.isArray(query))
            {
                query = [query];
            } 
            
            //See what we have to do
            if( query.length === 0){ return []; } //empty array
            else if( query[0].$each )
            { 
                return this.parseCollection(node, query[0], context); 
            }
            else if( query[0].$q )      
            { 
                return this.parseField(node, query, context); 
            }
            else{//parse keys
                return this.parseMembers(node, query[0], context);
            }
        }
        
        parseMembers(node, definition)
        {
             var data = {};
                for (let key in definition)
                {
                    data[key] = this.parseNode(node, definition[key]);
                }

                return data;
        }
        
        parseCollection (node, definition)
        {
            //rely on an error from system in case setup is incorrect
                var def = Object.assign({}, definition);
                
                //we will collect an array of results
                var collection = [];

                var cq = def.$each;
                delete def.$each;
           
                this.extractor(node, cq)
                    .forEach((node) => {
                        collection.push(this.parseNode(node, def));
                    }, this);
                return collection;
        };

        parseField(node, queries)
        {
            var val = null;
            for (var i = 0; i < queries.length; i++) {
                let def = queries[i];
 
                //Skip, empty
                if (!def)   { return ""; }
                //return a fixed value
                if (def.$val){ return def.$val;}

                //Query the node
                val = node;
                if (def.$q)
                {
                    val = this.extractor(node, def.$q);
                    if(val === undefined){ continue; }
                    if(Array.isArray(val) && !(def.$o && def.$o.all)){val = val[0];}
                }

                //Get the atribute and process it
                if (def.$m){ 
                    val = this.runMacros(val, def.$m); 
                }

                //break the loop, we have a value
                break;
            }

            return val;
        };

        runMacros(value, macros)
        {   
            //format macro to uniform format
            if (!Array.isArray(macros))
            {
                macros = [macros];
            }

            macros.forEach(function (macro) {
                if (typeof macro === "string")
                {
                    value = this.parsers[macro](value);
                } else {
                    for (let name in macro)
                    {
                        value = this.parsers[name](value, macro[name]);
                    }
                }
            }, this);

            return value;
        };
    }
    
    
    
    export {Runner};