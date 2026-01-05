import { Post } from '@/types'
import { fetchGraphQL } from './client'

// Query para buscar todos os posts
export async function getAllPosts(): Promise<Post[]> {
  const query = `
    query {
      allPosts {
        id
        title
        content
      }
    }
  `
  const result = await fetchGraphQL(query)
  return result.allPosts
}
