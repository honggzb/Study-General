'use client'

import { createPost, deletePost, getAllPosts, updatePost } from '@/api/rest'
import { ButtonGoBack, PostCard, PostForm } from '@/components'
import { BasePost, Post } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export default function PostsRest() {
  const [newPost, setNewPost] = useState({ title: '', content: '' })
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const queryClient = useQueryClient()

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  })

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setNewPost({ title: '', content: '' })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  const handleEdit = (post: Post) => {
    setEditingPost(post)
    setNewPost({ title: post.title, content: post.content })
  }

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setNewPost({ title: '', content: '' })
      setEditingPost(null)
    },
  })

  const handleSubmit = (post: BasePost) => {
    if (editingPost) {
      updateMutation.mutate({ ...editingPost, ...post })
      return
    }
    createMutation.mutate(post)
  }

  const cancelEdit = () => {
    setEditingPost(null)
    setNewPost({ title: '', content: '' })
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
        <h1 className="text-2xl font-bold">Posts (Rest)</h1>
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
        {posts?.map((post) => (
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
