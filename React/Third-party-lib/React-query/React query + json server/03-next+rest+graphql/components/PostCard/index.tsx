'use client'

import { PostCardProps } from './PostCard.types'

export function PostCard({ post, onEdit, onDelete, isDeleting }: PostCardProps) {
  return (
    <div key={post.id} className="border p-4 rounded">
      <h2 className="font-semibold">{post.title}</h2>
      <p>{post.content}</p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onEdit(post)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(post.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          disabled={isDeleting}
        >
          {isDeleting ? 'Deletando...' : 'Deletar'}
        </button>
      </div>
    </div>
  )
}
