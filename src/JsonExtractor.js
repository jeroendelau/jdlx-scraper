export default queryPath;
    
function queryPath (node, path)
        {
            if (path && !Array.isArray(path))
            {
                path = path.split(".");
            }

            if (path.length === 0)
            {
                return node;
            }

            var elem = path.shift();
            return queryPath(node[elem], path);
        };



