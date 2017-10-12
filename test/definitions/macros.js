var defs = {};
defs.testSingle = 
        {
             'result': {'$q': 'totrim', '$m':"trim"}
        };
        

defs.testSingleWithArray = 
        {
             'result': {'$q': 'totrim', '$m':["trim"]}
        };

defs.testSequence = 
        {
             'result': {'$q': 'totrim_tonumber', '$m':["trim", "toNumber"]}
        };

defs.testWithParams = 
        {
             'result': {'$q': 'regexp', '$m':[{'match': {'regexp': /aha: ?([A-Z0-9]*)/, 'group': 1} }]}
        };
        
defs.testWithParamsSequence = 
        {
             'result': {'$q': 'regexp_trim_tonumber', '$m':[{'match': {'regexp': /\[([A-Z0-9 ]*)\]/, 'group': 1} }, "trim", "toNumber"]}
        };
        
export default defs;
        
        




