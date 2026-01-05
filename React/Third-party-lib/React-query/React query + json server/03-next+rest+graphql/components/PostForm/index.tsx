'use client'

import type { BasePost } from '@/types'
import { useEffect, useState } from 'react'
import type { PostFormProps } from './PostForm.types'

export function PostForm({
  initialPost,
  editingPost,
  isSubmitting,
  onSubmit,
  onCancel,
}: PostFormProps) {
  const [post, setPost] = useState<BasePost>(initialPost)

  useEffect(() => {
    // Atualiza o formulário quando o post a ser editado muda
    if (editingPost) {
      setPost({ title: editingPost.title, content: editingPost.content })
    } else {
      setPost({ title: '', content: '' })
    }
  }, [editingPost])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(post)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded">
      <h2 className="text-xl mb-4">{editingPost ? 'Editar Post' : 'Criar Novo Post'}</h2>
      <input
        type="text"
        placeholder="Título"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <textarea
        placeholder="Conteúdo"
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? editingPost
              ? 'Atualizando...'
              : 'Criando...'
            : editingPost
              ? 'Atualizar Post'
              : 'Criar Post'}
        </button>
        {editingPost && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
