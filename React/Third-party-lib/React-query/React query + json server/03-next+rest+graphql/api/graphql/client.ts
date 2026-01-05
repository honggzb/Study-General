import { GRAPHQL_API_URL } from '@/constants'

// Função auxiliar para fazer requisições GraphQL
export async function fetchGraphQL(query: string, variables = {}) {
  const response = await fetch(GRAPHQL_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    throw new Error('Erro na requisição GraphQL')
  }

  const data = await response.json()
  if (data.errors) {
    throw new Error(data.errors[0].message)
  }

  return data.data
}
