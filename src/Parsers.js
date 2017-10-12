export default class Parsers {
    /**
     * Remove all exccess space, tabs and newlines
     *
     * @param {string} original
     * @returns {string}
     */
    static trim(val)
    {
        //first strip away tabs and spaces
        var result = val;
        result = result.replace(/\t|\n/g, "");

        //then strip away double spaces
        result = result.replace(/[ ]{2,}/g, " ");
        
        //strip away leading spaces
        return result .trim();
    }

    /**
     *  Make a link absolute compared to provided pageUrl
     *
     *  @param {string} pageUrl
     *  @param {string} link
     *  @returns {string}
     */
    static toAbsolute(val, link) {

        //already absolute
        if (link.indexOf("http") === 0) {
            return link;
        }

        //relative to base
        var protocol = val.match(/^https?/)[0];
        var rel = val.match(/^(https?:\/\/[\S]*)\//)[0];
        var base = val.match(/^(https?:\/\/[\S]*?)\//)[1];

        if (link.indexOf("data") === 0) { //data:link
            return link;
        }

        if (link.indexOf("//") === 0) { //protocol fix
            return protocol + ":" + link;
        } else if (link.indexOf("/") === 0) {
            return base + link;
        } else //relative to cart
        {
            return rel + link;
        }
    }

    static toCurrency(val)
    {
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
    static toText(val)
    {
        return String(val);
    }

    /**
     * Trims innerText and parses it as a number
     *
     * @param {DomNode} elem
     * @returns {Number}
     */
    static toNumber(val)
    {
        return Number(val);
    }


    /**
     * Match the value against
     */
    static match(val, options)
    {
        var reg = options.regexp;
        var group = options.group || 0;

        var res = val.match(reg);
        if (res && res[group])
        {
            return res[group];
        }
        return "0";
    }
}
