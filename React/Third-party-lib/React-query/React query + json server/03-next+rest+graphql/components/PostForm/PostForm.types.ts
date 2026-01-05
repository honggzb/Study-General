import { BasePost, Post } from '@/types'

export interface PostFormProps {
  initialPost: { title: string; content: string }
  editingPost: Post | null
  isSubmitting: boolean
  onSubmit: (post: BasePost) => void
  onCancel: () => void
}
