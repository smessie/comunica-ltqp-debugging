# Node

```bash
cd node/
npm install
node .
```

The query gives back 4 results as expected.

# Vite

```bash
cd vite/
npm install
npm run dev
```

The query gives back 0 results, while expecting the same 4 results as in the Node example.

# Vue

```bash
cd vue/
npm install
npm run dev
```

The query gives back 0 results, while expecting the same 4 results as in the Node example.

# Comunica live version

[Online version](https://comunica.github.io/comunica-feature-link-traversal-web-clients/builds/solid-default/#datasources=https%3A%2F%2Fsolid.smessie.com%2Fmellon-test%2Fldesinldp%2F%23EventStream&query=%20%20%20%20PREFIX%20ldes%3A%20%3Chttps%3A%2F%2Fw3id.org%2Fldes%23%3E%0A%20%20%20%20PREFIX%20tree%3A%20%3Chttps%3A%2F%2Fw3id.org%2Ftree%23%3E%0A%20%20%20%20PREFIX%20ldp%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2Fns%2Fldp%23%3E%0A%20%20%20%20PREFIX%20dc%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%0A%20%20%20%20%0A%20%20%20%20SELECT%20%3Fmember%20%3FdateTime%0A%20%20%20%20WHERE%20%7B%0A%20%20%20%20%20%20%3Chttps%3A%2F%2Fsolid.smessie.com%2Fmellon-test%2Fldesinldp%2F%23EventStream%3E%20a%20ldes%3AEventStream%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20tree%3Aview%20%3Fview.%0A%20%20%20%20%20%20%3Fview%20a%20tree%3ANode%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20tree%3Arelation%20%3Frelation.%0A%20%20%20%20%20%20%3Frelation%20a%20%3FrelationType%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20tree%3Anode%20%3Fnode.%0A%20%20%20%20%20%20%3Fnode%20a%20ldp%3ABasicContainer%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20ldp%3Acontains%20%3Fmember.%0A%20%20%20%20%20%20%3Fmember%20a%20ldp%3AResource%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20dc%3Amodified%20%3FdateTime.%0A%20%20%20%20%20%20FILTER%20(%3Fnode%20%3D%20%3Chttps%3A%2F%2Fsolid.smessie.com%2Fmellon-test%2Fldesinldp%2F1693558885201%2F%3E).%0A%20%20%20%20%7D)

The query gives back 4 results as expected.
