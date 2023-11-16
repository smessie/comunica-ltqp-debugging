import {QueryEngine} from "@comunica/query-sparql-link-traversal-solid";

const engine = new QueryEngine();
await engine.invalidateHttpCache();

const query = `
    PREFIX ldes: <https://w3id.org/ldes#>
    PREFIX tree: <https://w3id.org/tree#>
    PREFIX ldp: <http://www.w3.org/ns/ldp#>
    PREFIX dc: <http://purl.org/dc/terms/>
    
    SELECT ?member ?dateTime
    WHERE {
      <https://solid.smessie.com/mellon-test/ldesinldp/#EventStream> a ldes:EventStream;
                   tree:view ?view.
      ?view a tree:Node;
            tree:relation ?relation.
      ?relation a ?relationType;
                tree:node ?node.
      ?node a ldp:BasicContainer;
            ldp:contains ?member.
      ?member a ldp:Resource;
              dc:modified ?dateTime.
      FILTER (?node = <https://solid.smessie.com/mellon-test/ldesinldp/1693558885201/>).
    }`;

console.log('query', query);

const bindings = await (await engine.queryBindings(query, {sources: ['https://solid.smessie.com/mellon-test/ldesinldp/#EventStream'], lenient: true})).toArray();

const result = bindings.map((binding) => {
    return {
        content: binding.get('member').value,
        metadata: {
            dateTime: binding.get('dateTime').value,
        },
    };
});
console.log(result);


