<script setup>
import {QueryEngine} from "@comunica/query-sparql-link-traversal-solid";

defineProps({
  msg: {
    type: String,
    required: true
  }
})

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

</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
