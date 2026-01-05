export interface Post extends BasePost {
  id: number
}

export interface BasePost {
  title: string
  content: string
}
