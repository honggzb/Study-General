```
├── name-contests/      ---create scalable GraphQL API project
│    ├── config/
│    │    ├── mongo.js
│    │    └── pg.js
│    ├── database/                    # query data from database + initial data
│    │    ├── loadTestMongoData.js
│    │    ├── mdb.js                    # query from mongodb
│    │    ├── pgdb.js                   # query from postgreSQL
│    │    └── test-pg-data.sql
│    ├── lib/
│    │    ├── index.js                # entry js file <- connect to both database
│    │    └── util.js
│    └── schema/
│         ├── mutations/              # GraphQL mutations Types
│         │    └── add-contsts.js
│         ├── types/                  # GraphQL user-defined Types
│         │    ├── activity.js          # union type
│         │    ├── contest-status.js
│         │    ├── contest.js
│         │    ├── name.js
│         │    ├── me.js
│         │    └── total-votes.js
│         └── index.js                # GraphQL root Types
├── concepts.md
```
