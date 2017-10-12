var defs = {};
defs.getCollection = 
        {
            result :{
                'testa': [{
                    '$each': 'col',
                    'testa': {'$q': 'a'},
                    'testb': {'$q': 'b'}
                }]
            }
        };

defs.pickFirstCollection = 
        {
            result :{
                    'testarray': {'$q': 'array'}
            }
        };

defs.pickWholeCollection = 
        {
            result :{
                    'testarray': {'$q': 'array', $o:{"all": true}}
            }
        };
        
export default defs;
        
        




