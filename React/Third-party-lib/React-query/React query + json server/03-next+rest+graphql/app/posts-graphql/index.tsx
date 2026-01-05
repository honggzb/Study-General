'use client'

import { createPost, deletePost, getAllPosts, updatePost } from '@/api/graphql'
import { ButtonGoBack, PostCard, PostForm } from '@/components'
import { BasePost, Post } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export default function PostsGraphQL() {
  const [newPost, setNewPost] = useState({ title: '', content: '' })
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const queryClient = useQueryClient()

  // Consulta GraphQL para buscar posts
  const { data, isLoading, error } = useQuery({
    queryKey: ['graphql-posts'],
    queryFn: getAllPosts,
  })

  // Mutation para criar post
  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['graphql-posts'] })
      setNewPost({ title: '', content: '' })
    },
  })

  // Mutation para deletar post
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['graphql-posts'] })
    },
  })

  // Mutation para atualizar post
  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['graphql-posts'] })
      setNewPost({ title: '', content: '' })
      setEditingPost(null)
    },
  })

  const handleEdit = (post: Post) => {
    setEditingPost(post)
    setNewPost({ title: post.title, content: post.content })
  }

  const cancelEdit = () => {
    setEditingPost(null)
    setNewPost({ title: '', content: '' })
  }

  const handleSubmit = (post: BasePost) => {
    if (editingPost) {
      updateMutation.mutate({ ...editingPost, ...post })
      return
    }
    createMutation.mutate(post)
  }

  if (isLoading) {
    return <div>Carregando...</div>
  }
  if (error) {
    return <div>Erro: {(error as Error).message}</div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Posts (GraphQL)</h1>
        <ButtonGoBack />
      </div>

      <PostForm
        initialPost={newPost}
        editingPost={editingPost}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        onSubmit={handleSubmit}
        onCancel={cancelEdit}
      />

      <div className="space-y-4">
        {data?.map((post: Post) => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={handleEdit}
            onDelete={(id) => deleteMutation.mutate(id)}
            isDeleting={deleteMutation.isPending}
          />
        ))}
      </div>
    </div>
  )
}
