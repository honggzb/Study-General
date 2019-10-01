[Building Scalable GraphQL API- Samer Buna](#top)

- [PostgreSQL](#postgresql)
  - [PostgreSQL模式（SCHEMA）](#postgresql%e6%a8%a1%e5%bc%8fschema)
- [Project structure](#project-structure)
- [set up a GraphQL HTTP EndPoint](#set-up-a-graphql-http-endpoint)
  - [connecting to postgres database](#connecting-to-postgres-database)
- [GraphQL Type](#graphql-type)
  - [general type](#general-type)
  - [Custom GraphQL Type](#custom-graphql-type)
  - [CamelCase allTheThings](#camelcase-allthethings)
  - [Modeling a one-to-many relationship](#modeling-a-one-to-many-relationship)
  - [Node's Cyclick Module Dependency](#nodes-cyclick-module-dependency)
- [connect to PostgreSQL and MongoDb at same time](#connect-to-postgresql-and-mongodb-at-same-time)
- [N+1 Queries Problems](#n1-queries-problems)
- [Working with Mutations](#working-with-mutations)
- [Working with Union](#working-with-union)

---------------------------------

**Preparation**

```shell
git clone https://github.com/reactjscamp/name-contests.git
cd name-contests
git chectout m3-02
npm install
node lib/index.js
# http://localhost:4000/graphql (in browser)
```

-------------------------------

## PostgreSQL

- superuser(postgres): 123456
- in Linus:  `sudo -i -u postgres`
- help: `\help <command_name>`, `\help SELECT`

```shell
# 进入postgres(命令行)
psql -U postgres
postgres=#
#创建用户，密码
postgres=# create user username with password '123456';
#为用户创建数据库
postgres=# create database dbname owner username;
postgres=# CREATE DATABASE contests WITH OWNER=postgres ENCODING='UTF8';
#list database
postgres=# \l
#进入数据库 \c 数据库名
postgres=# \c contests
#根据sql文件创建table(命令行)
psql -U postgres -d contests -f database/test-pg-data.sql
#查看所有table
postgres=# \d
#查看某个table的结构(表格信息)
postgres=# \d users;
#查看某个table的内容
postgres=# select * from users;
```

### PostgreSQL模式（SCHEMA）

- PostgreSQL模式（SCHEMA）可以看着是一个表的集合
  - `CREATE TABLE myschema.mytable ( ...);`
- 一个模式可以包含视图、索引、据类型、函数和操作符
  - 相同的对象名称可以被用于不同的模式中而不会出现冲突，例如schema1和myschema都可以包含名为mytable的表
- 使用模式的优势
  - 允许多个用户使用一个数据库并且不会互相干扰
  - 将数据库对象组织成逻辑组以便更容易管理
  - 第三方应用的对象可以放在独立的模式中，这样它们就不会与其他对象的名称发生冲突
- 模式类似于操作系统层的目录，但是模式不能嵌套

## Project structure

- run automatically after code changed, `nodemon --exec node lib/index.js`
- Lib: express-graphql, graphql, mongodb, assert

```shell
├── config/
│    ├── mongo.js
│    └── pg.js
├── database/                    # query data from database + initial data
│    ├── loadTestMongoData.js
│    ├── mdb.js                    # query from mongodb
│    ├── pgdb.js                   # query from postgreSQL
│    └── test-pg-data.sql
├── lib/
│    ├── index.js                # entry js file <- connect to both database
│    └── util.js
├── schema/
│    ├── mutations/              # GraphQL mutations Types
│    │    └── add-contsts.js
│    ├── types/                  # GraphQL user-defined Types
│    │    ├── activity.js          # union type
│    │    ├── contest-status.js
│    │    ├── contest.js
│    │    ├── name.js
│    │    ├── me.js
│    │    └── total-votes.js
│    └── index.js                # GraphQL root Types
```

## set up a GraphQL HTTP EndPoint

```javascript
//lib/index.js
const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);
const app = require('express')();
//read the query from command line arguments
const query = process.argv[2];
const ncSchema = require('../schema');
//const { graphql } = require('graphql');
// graphql(ncSchema, query).then( result => {
//     console.log(result);
// });
// node lib/index.js {hello}
const graphqlHTTP = require('express-graphql');
app.use('/graphql', graphqlHTTP({
    schema: ncSchema,
    graphiql: true
}))
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
```

[back to top](#top)

### connecting to postgres database

```javascript

```

[back to top](#top)

## GraphQL Type

### general type

```javascript
//schema/index.js
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
// The root query type is where in the data graph we can start asking questions
const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        hello: {
            type: GraphQLString,
            description: 'The *mandatory* hello world example, GraphQL style',
            resolve: () => 'world'
        }
    }
})
const ncSchema = new GraphQLSchema({
    query: RootQueryType
});
module.exports = ncSchema;
```

### Custom GraphQL Type

```javascript
//types/me.js
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = require('graphql');
module.exports = new GraphQLObjectType({
    name: 'MeType',
    fields: {
        id: { type: GraphQLID },
        email: { type: new GraphQLNonNull(GraphQLString) }
    }
})
//schema/index.js
const MeType = require('./types/me');
// The root query type is where in the data graph we can start asking questions
const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        me: {
            type: MeType,
            description: 'The current user identified by an api key',
            args: {
                key: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: () => {
                return {
                    id: 42,
                    email: 'fake@example.com'
                }
            }
        }
    }
})
```

[back to top](#top)

### CamelCase allTheThings

```javascript
//database/pgdb.js
const humps = require('humps');
module.exports = pgPool => {
    return {
        getUser(apiKey) {
            return pgPool.query(`
            select * from users where api_key=$1`, [apiKey]).then( res => {
                return humps.camelizeKeys(res.rows[0]);
            });
        }
    }
}
```

![](https://i.imgur.com/K4biBTO.png)

[back to top](#top)

### Modeling a one-to-many relationship

![](https://i.imgur.com/bzHMSQR.png)

```javascript
// files structure
├── schema/
│   └── types/
│      ├── contest-status.js
│      ├── contest.js
│      └── me.js              // me Type
├── database/
│   └──pgdb.js
// GraphQL query
{
	user1: me(key: "4242"){
    ...userInfo
  },
  user2: me(key: "0000"){
    ...userInfo
  }
}
fragment userInfo on MeType{
  id
  email
  fullName
  contests {
    id
    code
    title
    description
    status
    createdAt
  }
}
//contest-status.js
const { GraphQLObjectType } = require('graphql');
module.exports = new GraphQLEnumType({
    name: 'ContestStatusType',
    values: {
        DRAFT: { value: 'draft' },
        PUBLISHED: { value: 'published' },
        ARCHIVED: { value: 'archived' }
    }
});
// contest.js
const { GraphQLObjectType, ...} = require('graphql');
const ContestStatusType = require('./contest-status');
module.exports = new GraphQLObjectType({
    name: 'ContestType',
    fields: {
        id: { type: GraphQLID },
        code: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        status: { type: new GraphQLNonNull(ContestStatusType) },
        createdAt: { type: new GraphQLNonNull(GraphQLString) }
    }
})
//me.js
const { GraphQLObjectType, ...} = require('graphql');
const pgdb = require('../../database/pgdb');
const ContestType = require('./contest');
module.exports = new GraphQLObjectType({
    name: 'MeType',
    fields: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        firstName: { type: GraphQLString },
        fullName: {
            type: GraphQLString,
            resolve: obj => `${obj.firstName} ${obj.lastName}`
        },
        email: { type: new GraphQLNonNull(GraphQLString) },
        createdAt: { type: GraphQLString },
        contests : {
            type: new GraphQLList(ContestType),
            resolve(obj, args, {pgPool }) {
                return pgdb(pgPool).getContests(obj);
            }
        }
    }
})
// pgdb.js - add query for contest
const humps = require('humps');
module.exports = pgPool => {
    return {
        getUser(apiKey) {
            return pgPool.query(`
                select * from users where api_key=$1`, [apiKey]).then( res => {
                    return humps.camelizeKeys(res.rows[0]);
            });
        },
        getContests(user) {
            return pgPool.query(`
                select * from contests where created_by=$1`, [user.id]).then( res => {
                    return humps.camelizeKeys(res.rows);
            });
        }
    };
}
```

[back to top](#top)

### Node's Cyclick Module Dependency

- GraphQL query sample

```
query MyContests {
  me(key: "4242") {
    id
    email
    fullName
    contests {
      id
      code
      title
      description
      status
      createdAt
      names {
        label
        createdBy {
          fullName
        }
      }
    }
  }
}
```

- js file sample

```javascript
//name.js
module.exports = new GraphQLObjectType({
    name: 'NameType',
    fields: () => {
        const MeType = require('./me');   // put it inside fields
        return {
            id: { type: GraphQLID },
            label: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: GraphQLString },
            createdAt: { type: new GraphQLNonNull(GraphQLString) },
            createdBy: {
                type: new GraphQLNonNull(MeType),
                resolve(obj, args, { pgPool }) {
                    return pgdb(pgPool).getUserById(obj.createdBy);
                }
             }
        };
    }
});
```

[back to top](#top)

## connect to PostgreSQL and MongoDb at same time

```javascript
// lib/index.js
const { MongoClient } = require('mongodb');
const assert = require('assert');
const mConfig = require('../config/mongo')[nodeEnv];
// connect mongodb and postgre at mean times
MongoClient.connect(mConfig.url, (err, mPool) => {
    assert.equal(err, null);
    app.use('/graphql', graphqlHTTP({
        schema: ncSchema,
        graphiql: true,
        context: { pgPool }
    }));
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
```

[back to top](#top)

## N+1 Queries Problems

- multiple query executed issues, using DataLoader to solve it
- [DataLoader](https://github.com/graphql/dataloader) is a generic utility to be used as part of your application's data fetching layer to provide a consistent API over various backends and reduce requests to those backends via batching and caching
- GraphQL query sample

```
query MyContests {
  me(key: "4242") {
    id
    email
    fullName
    c1: contests {
      title
      names {
        label
        createdBy {
          fullName
        }
      }
    }
    c2: contests {
      title
      names {
        label
        createdBy {
          fullName
        }
      }
    }
    c3: contests {
      title
      names {
        label
        createdBy {
          fullName
        }
      }
    }
  }
}

```

```javascript
//database/pgdb.js - define query method
module.exports = pgPool => {
    const orderedFor = (rows, collection, field, singleOject) => {
        //return the row ordered for the collection
        const data = humps.camelizeKeys(rows);
        const inGroupsOfField = _.groupBy(data, field);
        return collection.map(element => {
            const elementArray = inGroupsOfField[element];
            if(elementArray) {
                return singleOject ? elementArray[0] : elementArray;
            }
            return singleOject ? {} : [];
        });
    };
    return {
        getUsersByIds(userIds) {
            return pgPool.query(`
                select * from users where id=ANY($1)`, [userIds]).then( res => {
                    return orderedFor(res.rows, userIds, 'id', true);
            });
        },
        getUsersByApiKeys(apiKeys) {
            return pgPool.query(`
                select * from users where api_key=ANY($1)`, [apiKeys]).then( res => {
                    return orderedFor(res.rows, apiKeys, 'apiKey', true);
            });
        },
        getContestsForUserIds(userIds) {
            return pgPool.query(`
                select * from contests where created_by=ANY($1)`, [userIds]).then( res => {
                    return orderedFor(res.rows, userIds, 'createdBy', false);
            });
        }
        //...
     };
}
//lib/index.js - define loaders
app.use('/graphql', (req, res) => {
        const loaders = {
            usersByIds: new DataLoader(pgdb.getUsersByIds),
            usersByApiKeys: new DataLoader(pgdb.getUsersByApiKeys),
            namesForContestIds: new DataLoader(pgdb.getNamesForContestIds),
            contestsForUserIds: new DataLoader(pgdb.getContestsForUserIds)
        };
        graphqlHTTP({
            schema: ncSchema,
            graphiql: true,
            context: { pgPool, loaders }
        })(req, res)
    });
// modify GraphQL type file by using loaders instead of using pgdb, schema/index.js, schema/types/contest.js, me.js, name.js
resolve(obj, args, { loaders }) {
    return loaders.namesForContestIds.load(obj.id);
}
```

[back to top](#top)

## Working with Mutations

![](https://i.imgur.com/GEoRGnN.png)

```javascript
// add RootMutationType in schema/index.js
const AddContestMutation = require('./mutations/add-contests');
const RootMutationType = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: () => ({
        AddContest: AddContestMutation,
        //AddName: AddNameMutation
    })
})
const ncSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType  // add rootMutationType
});
//2) define query method in database/pgdb.js
 addNewContest({apiKey, title, description}) {
            return pgPool.query(`
                insert into contests(code, title, description, created_by) values ($1, $2, $3,
                    (select id from users where api_key=$4))
                returning *
            `, [slug(title), title, description, apiKey]).then(res => {
                return humps.camelizeKeys(res.rows[0]);
            });
        }
//3) define Mutation type in schema/mutations/add-contests.js
const pgdb = require('../../database/pgdb');
const ContestType = require('../types/contest');
const ContestInputType = new GraphQLInputObjectType({
    name: 'ContestInput',
    fields: {
        apiKey: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
    }
})
module.exports = {
    type: ContestType,
    args: {
        input: { type: new GraphQLNonNull(ContestInputType)}
    },
    resolve(obj, { input }, { pgPool }) {
        return pgdb(pgPool).addNewContest(input);
    }
};
```

[back to top](#top)

## Working with Union

- query Sample

```
{
  me(key: "0000") {
    email
    fullName
    activities {
      ... on Contest {
        title
      }
      ... on Name {
        label
      }
    }
  }
}
```

[back to top](#top)

> Reference
- [PostgreSQL教程](https://www.runoob.com/postgresql)