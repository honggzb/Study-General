import { BasePost, Post } from '@/types'
import { fetchGraphQL } from './client'

// Mutation para criar post
export async function createPost(post: BasePost) {
  const mutation = `
    mutation CreatePost($title: String!, $content: String!) {
      createPost(title: $title, content: $content) {
        id
        title
        content
      }
    }
  `
  return fetchGraphQL(mutation, { title: post.title, content: post.content })
}

// Mutation para atualizar post
export async function updatePost(post: Post) {
  const mutation = `
    mutation UpdatePost($id: ID!, $title: String!, $content: String!) {
      updatePost(id: $id, title: $title, content: $content) {
        id
        title
        content
      }
    }
  `
  return fetchGraphQL(mutation, { id: post.id, title: post.title, content: post.content })
}

// Mutation para deletar post
export async function deletePost(id: number) {
  const mutation = `
    mutation DeletePost($id: ID!) {
      deletePost(id: $id)
    }
  `
  return fetchGraphQL(mutation, { id })
}
