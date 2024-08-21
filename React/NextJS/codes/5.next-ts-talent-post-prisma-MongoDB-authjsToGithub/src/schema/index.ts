
import { z } from "zod"

export const PostSchema = z.object({
  post: z.string().min(2).max(50),
})