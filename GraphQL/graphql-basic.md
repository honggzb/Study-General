- [Introduction](#introduction)
  - [GraphQL benefits](#graphql-benefits)
- [Core concepts](#core-concepts)
- [Queries - Fetching data](#queries---fetching-data)
- [Queries - Fetching data](#queries---fetching-data-1)
- [Mutations - Writing data](#mutations---writing-data)
- [Subscriptions - Realtime updates](#subscriptions---realtime-updates)

-----------------------------------------------------------------------
## Introduction

### GraphQL benefits

- <mark>Avoid over-fetching</mark>: avoid fetching more data than you need because you can **specify the exact fields** you need.
- <mark>Prevent multiple API calls</mark>
- Less communication overhead with API developers
- Self-documenting: Every GraphQL API conforms to a "schema" which is the graph data model and what kinds of queries a client can make. This allows the community to build lots of cool tools to explore & visualise your API or create IDE plugins that autocomplete your GraphQL queries

**GraphQL vs REST**

|Requirement|	REST|	GraphQL|
|---|---|---|
|Fetching data objects	|GET	|query|
|Inserting data	|POST	|mutation|
|Updating/deleting data|	PUT/PATCH/DELETE|	mutation|
|Watching/subscribing to data	|-	|subscription|

**HTTP Status Codes**

|Status Code|	REST|	GraphQL|
|---|---|---|
|200	|Ok|	Ok|
|400	|Bad Request	|-|
|401|	Unauthorized|	-|

[⬆ back to top](#top)

## Core concepts

1. <mark>document</mark>: content of a GraphQL request string is called the GraphQL document
2. Anatomy of a GraphQL Document
   - <mark>Fields</mark>, <mark>Arguments</mark>, <mark>Variables</mark>, <mark>Operation Name</mark>, <mark>Aliases</mark>, <mark>Fragments</mark>
   - <mark>Directives</mark>:  identifier `@`
     - `@deprecated(reason: String)` - marks the field as deprecated
     - `@skip (if: Boolean)` - Skips GraphQL execution for this field
     - `@include (if: Boolean)` - Calls resolver for an annotated field, if true
3. operation
   1. <mark>query</mark> (a read-only fetch)
   2. <mark>mutation</mark> (a write followed by fetch)
   3. <mark>subscription</mark> (a long‐lived request that fetches data in response to source events.)


```gql
""" document """
{
  author {
    id
    name
  }
}
""" operation """
query {
  author {
    id
    name
  }
}
```

```gql
query {
  author(limit: 5) {   """ Arguments """
    id                 """ Field """
    name               """ Field """
    articles {
      id               """ Field with other document """
      title            """ Field with other document """
    }
  }
}
query ($limit: Int) {    """ Variables """
  author(limit: $limit) {
    id
    name
  }
}
query fetchAuthor {
  author(id: 1) {
    name
    profile_pic_large: profile_pic(size: "large")  """ Aliases """
    profile_pic_small: profile_pic(size: "small")
  }
}
""" Fragments """
fragment authorFields on author {
  id
  name
  profile_pic
  created_at
}
query fetchAuthor {
  author(id: 1) {
    ...authorFields
  }
}
query fetchAuthors {
  author(limit: 5) {
    ...authorFields
  }
}
""" Operation Name """
query fetchAuthors {
  author(limit: 5, order_by: { name: asc }) {
    id
    name
    profile_pic
  }
}
""" directive """
query ($showFullname: Boolean!) {
  author {
    id
    name
    fullname @include(if: $showFullname)  """ directive """
  }
}

```

[⬆ back to top](#top)

## Queries - Fetching data

1. Anonymous queries
2. Named queries
3. Queries with Parameters (Arguments)
4. Queries with variables: passing arguments to Queries Dynamically
5. GraphQL Limit and Offset
6. Query Filter - `Where` Clause

```gql
###
  Queries with multiple Parameters (Arguments)
  fetch 1 user and the 5 most recent todos for that user
###
query {
  users (limit: 1) {
    id
    name
    todos(order_by: {created_at: desc}, limit: 5) {
      id
      title
    }
  }
}
### Queries with variables ###
query ($limit: Int!) {
  todos(limit: $limit) {
    id
    title
  }
}
###
   5. GraphQL Limit and Offset
   if we have 50 todos, split them into 5 pages of 10 todos
###
{
  todos(limit: 5, offset: 0) {
    title
    is_completed
    is_public
  }
}
### Query Filter - Where Clause ###
{
  todos(where: {is_public: {_eq: false}}) {
    title
    is_public
    is_completed
  }
}
### all the public notes from a specific user ###
{
  users(where: {id: {_eq: "61dd5e7dc4b05c0069a39att"}}) {
    name
    todos(where: {is_public: {_eq: true}}) {
      title
      is_public
    }
  }
}
```

[⬆ back to top](#top)

## Queries - Fetching data

```gql
query {
  users (limit: 1) {
    id
    name
    todos(order_by: {created_at: desc}, limit: 5) {
      id
      title
    }
  }
}
### Query With Variables ###
query ($limit: Int!) {
  todos(limit: $limit) {
    id
    title
  }
}
### Query Filter - Where Clause ###
{
  todos(where: {is_public: {_eq: false}}) {
    title
    is_public
    is_completed
  }
}
```

[⬆ back to top](#top)

## Mutations - Writing data

- GraphQL Mutations as the equivalent of POST, PUT, PATCH and DELETE requests in REST
- Types of GraphQL Mutations: Insert Mutations, Update Mutations, Delete Mutations


```gql
mutation {
  insert_todos(objects: [{ title: "Learn about GraphQL Mutations" }]) {
    returning {
      id
    }
  }
}
### Variables: Pass Arguments to Mutations Dynamically ###
# The parameterised GraphQL mutation
mutation($todo: todos_insert_input!){
  insert_todos(objects: [$todo]) {
    returning {
      id
    }
  }
}
### Update todos ###
mutation ($id: Int, $is_completed: Boolean, $title: String) {
  update_todos(where: {id: {_eq: $id}}, _set: {is_completed: $is_completed, title: $title}) {
    affected_rows
    returning {
      id
      title
      is_completed
    }
  }
}
### Delete a todo ###
mutation($id: Int) {
  delete_todos(where: {id: {_eq: $id}}) {
    affected_rows
    returning {
      id
      title
    }
  }
}
### Bulk Mutation ###
mutation {
  insert_todos(
    objects: [
      { title: "Learn about GraphQL Mutations" },
      { title: "Learn about Bulk Mutations" }
    ]
  ) {
    affected_rows
    returning {
      id
      title
      is_completed
    }
  }
}
mutation($todos: [todos_insert_input!]!) {
  insert_todos(objects: $todos) {
    affected_rows
    returning {
      id
      title
      is_completed
    }
  }
}
```

[⬆ back to top](#top)

## Subscriptions - Realtime updates

- A Subscription is a GraphQL operation that enables you to subscribe to events on the server. You will get real-time updates from the server each time the event you subscribed to occurs
- An event can represent a record insertion, modification or deletion
- GraphQL Subscriptions are a critical component of adding real-time or reactive features to your applications
- GraphQL Subscriptions are implemented using the WebSocket protocol, enabling us to create a persistent connection between the server and client

```gql
subscription {
  online_users {
    id
    last_seen
    user {
      name
    }
  }
}
```
