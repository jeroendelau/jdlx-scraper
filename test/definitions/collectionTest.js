export default {
            result :{
                collection: [{
                    '$each': {'$q': '.fba-core-data tbody tr:not(".actions"):not(".actions-footer")'},
                    'name': {'$q': 'td:first', '$m':'text'},
                    'description': {'$q': 'td.info dt:first', '$m':'text'},
                    'condition': {'$q': 'td.info+td', 'm': 'text'},
                    'asin': {'$q': '.sku-identifiers', 'm':[
                            {'match': {'regexp': /ASIN: ?([A-Z0-9]*)/,  'group': 1} }]},
                    'fnsku': {'$q': '.sku-identifiers', 'm':[
                            {'match': {'regexp': /FNSKU: ?([A-Z0-9]*)/, 'group': 1} }]},
                    'number': {'$q': '.number', 'm':'number'},
                    'labels': {'$q': '.update-label-quantity', 'p':'value'}
                }]
            }
        };
        

