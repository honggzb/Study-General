## General Concept

![](https://i.imgur.com/SzN5LNu.png)

- [online editor](https://www.graphqlhub.com/)

[back to top](#top)

## GraphQL

- is a query language for APIs that allows clients to request exactly the data they need
- developed by Facebook in 2012, released publicly in 2015
- to solve the over-fetching issues and user-fetching data in traditional REST APIs

|Feature|REST|GraphQL|
|---|---|---|
|Data Fetching|multiple endpoints, fixed responses|single endpoints, flexible responses|
|Over-fetching|common due to fixed data structures|avoided by querying only needed data|
|Versioning|requires versioned endpoints(/v1/)|no versionig, schema evolves with types|
|Error Handling|HTTP status codes|Custom error responses in response object|

|Query|Mutation|
|---|---|
|a read-only operation that allows clients to request(get) specific data from server| an operation that allows clients to modify data on the server(create, update, delete)|
|used to fetch data without modifying and existing data on the server|used to perform write operations and change the server's data|

## Apollo

- Apollo is an open-source GraphQL implementation that help manage data fetching in a more efficient an flexible way
- it simplifies the integration of GraphQL in both frontend and backend development with Apollo Server & Apollo Client
  - **Apollo Server**: 
    - a GraphQL server a library that connects GraphQL schema to a data source and handles incoming queries and mutations
    - it works with any backend, including REST APIs, databases, etc
    - includes tools like Apollo Studio for monitoring and managing GraphQL API
  - **Apollo Client**:
    - a powerful state management libray for javascript apps that enables to interact with a GraphQL API
    - automatically updates the UI based on the data fetched
    - efficiently manages and synchronizes the app's data with the backend


|Frontend(Apollo Client)|Backend(Apollo Server)|
|---|---|
|simplies data fetching with hooks|fexible schema defination and resolver logic|
|automaticv UI updates with data changes|integrates with any data source|
|state management and caching out-of-the-box|Apollo studio for managing GraphQL API|

## GraphQL Query Language

### Varibles && Directives

一个指令可以附着在字段或者片段包含的字段上，然后以任何服务端期待的方式来改变查询的执行。GraphQL 的核心规范包含两个指令，其必须被任何规范兼容的GraphQL服务器实现所支持：

- `@include(if: Boolean)` 仅在参数为true时，包含此字段
- `@skip(if: Boolean)` 如果参数为true，跳过此字段

```javascript
query TestQuery($currentUserName: String!, $includeRepos: Boolean!) {
  graphQLHub
  github {
    user(username: $currentUserName) {
      id
      company
      avatar_url
      repos @include(if: $includeRepos) {
        name
      }
    }
  }
}
//query variables
{
 "currentUserName": "leebyron",
  "includeRepos": true
}
```

### Alias

```javascript
query TestQuery($userName1: String!, $userName2: String!) {
  graphQLHub
  github {
    user1: user(username: $userName1) {
      id
      company
      avatar_url
    }
    user2: user(username: $userName2) {
      id
      company
      avatar_url
    }
  }
}
//query variables
{
 "userName1": "leebyron",
 "userName2": "dschafer"
}
```

[back to top](#top)

### Fragments

```javascript
query TestQuery($userName1: String!, $userName2: String!) {
  graphQLHub
  github {
    user1: user(username: $userName1) {
      ...UserInfo
    }
    user2: user(username: $userName2) {
      ...UserInfo
    }
  }
}
fragment UserInfo on GithubUser {
  id
  company
  avatar_url
}
//query variables
{
 "userName1": "leebyron",
 "userName2": "dschafer"
}
```

[back to top](#top)

### Inline Fragments

author result is union of Github user and Guest user

```javascript
query TestQuery {
  graphQLHub
  github {
    repo(name: "graphql", ownerUsername: "facebook") {
      commits {
        message
        author {
          ... on GithubUser {  //inline Fragments, for Github user
            login
          }
          ... on GithubCommitAuthor {  //inline Fragments, for Guest user
            email
          }
        }
      }
    }
  }
}
```

[back to top](#top)

### Mutations变更

- 一个约定来规范任何导致写入的操作都应该显式通过变更（mutation）来发送, 获取一个对象变更后的新状态
- 例如，当一个字段自增的时候，可以在一个请求中变更并查询这个字段的新值

```javascript
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
//query variables
{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}
```

[back to top](#top)

## GraphQL Runtime



[back to top](#top)

> Reference
- https://graphql.org/
- [online editor](https://www.graphqlhub.com/)
- [GraphQL中文](https://graphql.cn/learn/)
- [Graphql javascript](https://graphql.org/graphql-js/)
- [前端er了解GraphQL，看这篇就够了](https://juejin.im/post/5ca1b7be51882543ea4b7f27)
