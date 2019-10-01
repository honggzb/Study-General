## General Concept

![](https://i.imgur.com/SzN5LNu.png)

- [online editor](https://www.graphqlhub.com/)

[back to top](#top)

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
