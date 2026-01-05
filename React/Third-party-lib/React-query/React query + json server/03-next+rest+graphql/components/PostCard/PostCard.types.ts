import { Post } from '@/types'

export interface PostCardProps {
  post: Post
  onEdit: (post: Post) => void
  onDelete: (id: number) => void
  isDeleting: boolean
}
