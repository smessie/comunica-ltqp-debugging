import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import {QueryEngine} from "@comunica/query-sparql-link-traversal-solid";

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))



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
