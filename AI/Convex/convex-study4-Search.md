[Search](#top)

- [Vector Search](#vector-search)
- [Full Text Search](#full-text-search)

-----------------------------------------------------------

## Vector Search

- Vector search allows you to find Convex documents similar to a provided vector. Typically, vectors will be embeddings which are numerical representations of text, images, or audio
- Vector search is **only** available in **Convex actions**
- Example: [Vector Search App](https://github.com/get-convex/convex-demos/tree/main/vector-search)
- To use vector search need to
  1. add **vector index** onto table's schema. Every vector index has a unique name and a definition with
     1. `vectorField` string
     2. `dimensions` number: The fixed size of the vectors index. If you're using embeddings, this dimension should match the size of your embeddings (e.g. 1536 for OpenAI)
     3. [Optional] `filterFields` array
     4. [Optional] `staged` boolean:
        - Defaults to `false`
        - If set to `true`, the index will be backfilled asynchronously from the deploy similar to [staged database indexes](https://docs.convex.dev/database/reading-data/indexes#staged-indexes). This is useful for large tables where the index backfill time is significant.
  2. Run a vector search from within an **action**
     1. Generate a vector from provided input (e.g. using OpenAI)
     2. Use `ctx.vectorSearch` to fetch the IDs of similar documents, the arguments are
        1. table name
        2. index name
        3. [VectorSearchQuery](https://docs.convex.dev/api/interfaces/server.VectorSearchQuery) object
           1. `vector` array
           2. [Optional] `limit` number:  value must be between 1 and 256
           3. [Optional] `filter`:  based on the filterFields in the vectorIndex in schema, See [Filter expressions](https://docs.convex.dev/search/vector-search#filter-expressions) for details
     3. Load the desired information for the documents

```ts
// define a vector index
// convex/schema.ts
foods: defineTable({
  description: v.string(),
  cuisine: v.string(),
  embedding: v.array(v.float64()),
}).vectorIndex("by_embedding", {
  vectorField: "embedding",
  dimensions: 1536,
  filterFields: ["cuisine"],
}),
// Run a vector search
// convex/foods.ts
import { v } from "convex/values";
import { action } from "./_generated/server";
export const similarFoods = action({
  args: {
    descriptionQuery: v.string(),
  },
  handler: async (ctx, args) => {
    // 1. Generate an embedding from your favorite third party API:
    const embedding = await embed(args.descriptionQuery);
    // 2. Then search for similar foods!
    const results = await ctx.vectorSearch("foods", "by_embedding", {
      vector: embedding,
      limit: 16,
      filter: (q) => q.eq("cuisine", "French"),
    });
    // 3. Fetch the results
    const foods: Array<Doc<"foods">> = await ctx.runQuery(
      internal.foods.fetchResults,
      { ids: results.map((result) => result._id) },
    );
    return foods;
  },
});
export const fetchResults = internalQuery({
  args: { ids: v.array(v.id("foods")) },
  handler: async (ctx, args) => {
    const results = [];
    for (const id of args.ids) {
      const doc = await ctx.db.get("foods", id);
      if (doc === null) {
        continue;
      }
      results.push(doc);
    }
    return results;
  },
});
```

[🚀back to top](#top)

## Full Text Search

- Full text search allows you to find Convex documents that approximately match a search query
- search queries look within a string field to find the keywords
- To use full text search you need to:
  - Define a search index
    - `name`: Must be unique per table
    - `searchField`: must be of type `string`
    - [Optional] `list of filterField`s
    - [Optional] boolean `staged` flag
      - Defaults to `false`
      - If set to `true`, the index will be backfilled asynchronously from the deploy similar to staged database indexes
  - Run a search query
    - `.withSearchIndex` method defines which search index to query and how Convex will use that search index to select documents
    - name of the `index`: 
    - search filter expression: it is always a **chained list** of
      - search expression against the index's search field defined with `.search`
      - or more equality expressions against the index's filter fields defined with `.eq`
      - also other retrieving method
        - filter results using the `.filter` method
        - retrieve the results using `.collect()`, `.take(n)`, `.first()`, and `.unique()`
        - paginated using `.paginate(paginationOpts)`

```ts
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
  messages: defineTable({
    body: v.string(),
    channel: v.string(),
  }).searchIndex("search_body", {
    searchField: "body",
    filterFields: ["channel"],
    staged: false,
  }),
});
/**/
// 10 messages in channel '#general
const messages = await ctx.db
  .query("messages")
  .withSearchIndex("search_body", (q) =>
    q.search("body", "hello hi").eq("channel", "#general"),
  )
  .take(10);
const messages = await ctx.db
  .query("messages")
  .withSearchIndex("search_body", (q) => q.search("body", "hi"))
  .filter((q) => q.gt(q.field("_creationTime", Date.now() - 10 * 60000)))
  .take(10);
```

[🚀back to top](#top)

- [Convex Docs](https://docs.convex.dev/home)
- [The Ultimate Convex Crash Course](https://www.youtube.com/watch?v=_Qqvoq8JVXM)
- [The Complete Convex Crash Course](https://www.youtube.com/watch?v=DpZIkkYPd5I)

