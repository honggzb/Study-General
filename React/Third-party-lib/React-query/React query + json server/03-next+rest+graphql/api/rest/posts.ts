import { REST_API_URL } from '@/constants'
import { BasePost, Post } from '@/types'

// Buscar todos os posts
export async function getAllPosts(): Promise<Post[]> {
  const response = await fetch(REST_API_URL)
  if (!response.ok) {
    throw new Error('Erro ao buscar posts')
  }
  return response.json()
}

// Criar um novo post
export async function createPost(post: BasePost): Promise<Post> {
  const response = await fetch(REST_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  if (!response.ok) {
    throw new Error('Erro ao criar post')
  }
  return response.json()
}

// Atualizar um post existente
export async function updatePost(post: Post): Promise<Post> {
  const response = await fetch(`${REST_API_URL}/${post.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  if (!response.ok) {
    throw new Error('Erro ao atualizar post')
  }
  return response.json()
}

// Deletar um post
export async function deletePost(id: number): Promise<void> {
  const response = await fetch(`${REST_API_URL}/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Erro ao deletar post')
  }
}
