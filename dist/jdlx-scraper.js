(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("jdlx-scraper", [], factory);
	else if(typeof exports === 'object')
		exports["jdlx-scraper"] = factory();
	else
		root["jdlx-scraper"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Scraper = __webpack_require__(1);

var _Scraper2 = _interopRequireDefault(_Scraper);

var _Parsers = __webpack_require__(3);

var _Parsers2 = _interopRequireDefault(_Parsers);

var _JsonExtractor = __webpack_require__(4);

var _JsonExtractor2 = _interopRequireDefault(_JsonExtractor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scraper = new _Scraper2.default();
/**
 * Scrapes information from provided document using scrape definitions
 * The point is to create reusable scrape definitions that can be re-used
 * in different scenarios
 *
 * @module Scraper
 */

scraper.registerParser("toText", _Parsers2.default.toText);
scraper.registerParser("toNumber", _Parsers2.default.toNumber);
scraper.registerParser("toCurrency", _Parsers2.default.toCurrency);
scraper.registerParser("trim", _Parsers2.default.trim);
scraper.registerParser("match", _Parsers2.default.match);
scraper.registerParser("toAbsolute", _Parsers2.default.toAbsolute);

scraper.registerExtractor("json", _JsonExtractor2.default);

exports.default = scraper;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Runner = __webpack_require__(2);

var _Runner2 = _interopRequireDefault(_Runner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scraper = function () {
    function Scraper() {
        _classCallCheck(this, Scraper);

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


    _createClass(Scraper, [{
        key: "registerParser",
        value: function registerParser(name, parser, override) {
            override = override || false;
            if (this.parsers[name] && !override) {
                throw "Parser " + name + " already exists";
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

    }, {
        key: "registerExtractor",
        value: function registerExtractor(name, extractor, override) {

            override = override || false;
            if (this.extractors[name] && !override) {
                throw "Extractor " + name + " already exists";
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

    }, {
        key: "scrape",
        value: function scrape(definition, extractor, document, context) {
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

    }, {
        key: "create",
        value: function create(definition, extractor) {
            if (!definition) {
                throw "Definition is not provided!";
            }

            if (!this.extractors[extractor]) {
                throw "Extractor " + name + " doesn't exists or is not registered";
            }

            return new _Runner2.default(definition, this.parsers, this.extractors[extractor]);
        }
    }]);

    return Scraper;
}();

exports.default = Scraper;
;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Scrapes information from provided document using scrape definitions
 * The point is to create reusable scrape definitions that can be re-used
 * in different scenarios
 *
 * @module Scraper
 */

var Runner = function () {

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
    function Runner(definition, parsers, extractor) {
        _classCallCheck(this, Runner);

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


    _createClass(Runner, [{
        key: "scrape",
        value: function scrape(document, context) {
            //set context to default object
            context = context || {};
            return this.parseNode(document, this.definition, context);
        }
    }, {
        key: "parseNode",
        value: function parseNode(node, query, context) {
            //since all queries are repeatable, surround with array
            if (!Array.isArray(query)) {
                query = [query];
            }

            //See what we have to do
            if (query.length === 0) {
                return [];
            } //empty array
            else if (query[0].$each) {
                    return this.parseCollection(node, query[0], context);
                } else if (query[0].$q) {
                    return this.parseField(node, query, context);
                } else {
                    //parse keys
                    return this.parseMembers(node, query[0], context);
                }
        }
    }, {
        key: "parseMembers",
        value: function parseMembers(node, definition) {
            var data = {};
            for (var key in definition) {
                data[key] = this.parseNode(node, definition[key]);
            }

            return data;
        }
    }, {
        key: "parseCollection",
        value: function parseCollection(node, definition) {
            var _this = this;

            //rely on an error from system in case setup is incorrect
            var def = Object.assign({}, definition);

            //we will collect an array of results
            var collection = [];

            var cq = def.$each;
            delete def.$each;

            //make it into an array
            if (!Array.isArray(cq)) {
                cq = [cq];
            }

            this.extractor(node, cq).forEach(function (node) {
                collection.push(_this.parseNode(node, def));
            }, this);
            return collection;
        }
    }, {
        key: "parseField",
        value: function parseField(node, queries) {
            var val = null;
            for (var i = 0; i < queries.length; i++) {
                var def = queries[i];

                //Skip, empty
                if (!def) {
                    return "";
                }
                //return a fixed value
                if (def.$val) {
                    return def.$val;
                }

                //Query the node
                val = node;
                if (def.$q) {
                    val = this.extractor(node, def.$q);
                }

                //Get the atribute and process it
                if (def.$m) {
                    val = this.runMacros(val, def.$m);
                }

                //break the loop, we have a value
                break;
            }

            return val;
        }
    }, {
        key: "runMacros",
        value: function runMacros(value, macros) {
            //format macro to uniform format
            if (!Array.isArray(macros)) {
                macros = [macros];
            }

            macros.forEach(function (macro) {
                if (typeof macro === "string") {
                    value = this.parsers[macro](value);
                } else {
                    for (var name in macro) {
                        value = this.parsers[name](value, macro[name]);
                    }
                }
            }, this);

            return value;
        }
    }]);

    return Runner;
}();

exports.default = Runner;
exports.Runner = Runner;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parsers = function () {
    function Parsers() {
        _classCallCheck(this, Parsers);
    }

    _createClass(Parsers, null, [{
        key: "trim",

        /**
         * Remove all exccess space, tabs and newlines
         *
         * @param {string} original
         * @returns {string}
         */
        value: function trim(val) {
            //first strip away tabs and spaces
            var result = val;
            result = result.replace(/\t|\n/g, "");

            //then strip away double spaces
            result = result.replace(/[ ]{2,}/g, " ");

            //strip away leading spaces
            return result.trim();
        }

        /**
         *  Make a link absolute compared to provided pageUrl
         *
         *  @param {string} pageUrl
         *  @param {string} link
         *  @returns {string}
         */

    }, {
        key: "toAbsolute",
        value: function toAbsolute(val, link) {

            //already absolute
            if (link.indexOf("http") === 0) {
                return link;
            }

            //relative to base
            var protocol = val.match(/^https?/)[0];
            var rel = val.match(/^(https?:\/\/[\S]*)\//)[0];
            var base = val.match(/^(https?:\/\/[\S]*?)\//)[1];

            if (link.indexOf("data") === 0) {
                //data:link
                return link;
            }

            if (link.indexOf("//") === 0) {
                //protocol fix
                return protocol + ":" + link;
            } else if (link.indexOf("/") === 0) {
                return base + link;
            } else //relative to cart
                {
                    return rel + link;
                }
        }
    }, {
        key: "toCurrency",
        value: function toCurrency(val) {
            //first retreive the ammount
            var m = val.match(/[0-9,]+[. ]?[0-9]*/);
            var ammount = m[0].trim().replace(" ", ".").replace(",", "");

            //now strip the symbol
            var symbol = val.replace(m[0], "").trim();

            return {
                'symbol': symbol,
                'ammount': ammount
            };
        }

        // Common type cleaners
        //--------------------------------------

        /**
         * Retrieves text from a DomNode's innertext and 
         * returns it as text. Use optional variable trim to
         * trim to further trim the output.
         * 
         * @param {DomElement|Stromg} element
         * @param {Boolean} trim
         * @returns {String}
         */
        /**
         * Gets innerText and trims it's output
         *
         * @param {DomNode} elem
         * @returns {String}
         */

    }, {
        key: "toText",
        value: function toText(val) {
            return String(val);
        }

        /**
         * Trims innerText and parses it as a number
         *
         * @param {DomNode} elem
         * @returns {Number}
         */

    }, {
        key: "toNumber",
        value: function toNumber(val) {
            return Number(val);
        }

        /**
         * Match the value against
         */

    }, {
        key: "match",
        value: function match(val, options) {
            var reg = options.regexp;
            var group = options.group || 0;

            var res = val.match(reg);
            if (res && res[group]) {
                return res[group];
            }
            return "0";
        }
    }]);

    return Parsers;
}();

exports.default = Parsers;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = queryPath;


function queryPath(node, path) {
    if (path && !Array.isArray(path)) {
        path = path.split(".");
    }

    if (path.length === 0) {
        return node;
    }

    var elem = path.shift();
    return queryPath(node[elem], path);
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=jdlx-scraper.js.map