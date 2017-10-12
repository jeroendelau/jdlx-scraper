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
        
export default defs;
        
        




