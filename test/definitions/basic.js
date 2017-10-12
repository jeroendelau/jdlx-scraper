var defs = {};
defs.minimal = 
        {
            result :{
                'testa': {'$q': 'a'},
                'testb': {'$q': 'b'}
            }
        };
        
defs.reorganize = 
        {
            result :{
                'testa': {'$q': 'a'},
                'testa1': {
                    'testb': {'$q': 'b'},
                    'testc': {'$q': 'c'}
                }
            }
        };
        
defs.nested = 
        {
            result :{
                'testa': {'$q': 'a'},
                'testb': {'$q': 'b'},
                'testc': {'$q': 'd.e'},
            }
        };
 
 defs.macro = 
        {
            result :{
                'test': {'$q': 'b', '$m':"toText"},
            }
        };
        
export default defs;
        
        




