```
│     ├──  📂NextJS/
│     │    ├── 📄Main Concepts of NextJS
│     │    ├── 📄NextJs学习-App Router.md
│     │    ├── 📄NextJs学习-Data Fetching.md
│     │    ├── 📄NextJs学习-Next.js多环境部署.md
│     │    ├── 📄NextJs学习-Zod and React-Hook-Form.md
│     │    ├── 📄NextJs学习-authentication-AuthJS.md
│     │    ├── 📄NextJs学习-authentication-clerk.md
│     │    ├── 📄NextJs学习-NextJs学习-debugging NextJS.md
│     │    ├── 📄NextJs学习-在Next.js中集成swagger文档.md
│     │    ├── 📄NextJs学习-概述.md
│     │    ├── 📄Nextjs学习小结2024.md
│     │    ├── 📄前端基础渲染模式-CSR、SSR、同构、静态化.md
│     │    └── 
```

-------------------------------------------------------------

|react-router-dom|nextJS|
|---|---|
|`useLocation`|[nextJS usePathname](https://nextjs.org/docs/app/api-reference/functions/use-pathname)|
|`useNavigate`|[nextJS useRouter](https://nextjs.org/docs/pages/api-reference/functions/use-router)|
|`useSearchParams`|[nextJS useSearchParams](https://nextjs.org/docs/app/api-reference/functions/use-search-params)|
|note|<mark>Client Component hook and is not supported in Server Components</mark>|

|Hook|description|methods/params|Return|
|---|---|---|---|
|useSearchParams|access the parameters of the current URL|`get()`, `has()`, `getAll()`, `keys()`, <br>`values()`, `entries()`,<br> `forEach()`, `toString()`|read-only URLSearchParams|
|usePathname|a string of the current URL's pathname||`/blog/hello-world` --> return '/blog/hello-world'<br>`/dashboard?v=2`--> return '/dashboard'|
|useRouter|enables navigation between routes within client components|`push()`,`replace()`,<br>`prefetch()`,`forward()`,<br>`back()`, `query`|'pages/[slug].js' <=>`router.query.slug` ||

- `URLSearchParams` is a Web API that provides utility methods for manipulating the URL query parameters. Instead of creating a complex string literal, you can use it to get the params string like ?page=1&query=a
- [Adding Search and Pagination-nextjs official course](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination)

```ts
import { redirect } from 'next/navigation'
async function fetchTeam(id: string) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}
export default async function Profile({ params }: { params: { id: string } }) {
  const team = await fetchTeam(params.id)
  if (!team) {
    redirect('/login')
  }
  // ...
}
```

-------------------------------

## Resouces

- [nextjs文档](https://nextjs.frontendx.cn/)
- [nextJs example-official](https://github.com/vercel/next.js/tree/canary/examples)
