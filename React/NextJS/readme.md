```
│     ├──  📂NextJS/
│     │    ├──  📂codes/
│     │    │      ├──  📂1.Foundation of NEXTJS/
│     │    │      ├──  📂2.next-js-product-list-dummyjson/
│     │    │      ├──  📂3.next-js-shop-list-prisma-MongoDB/
│     │    │      ├──  📂4.next-js-talent-list-prisma-MongoDB-action/
│     │    │      ├──  📂5.next-ts-talent-post-prisma-MongoDB-authjsToGithub/
│     │    │      └── 📂6.NextJs学习-Zod and React-Hook-Form/
│     │    ├── 📄Main Concepts of NextJS-2023.md
│     │    ├── 📄NextJs-useful.md
│     │    ├── 📄NextJs学习-App Router.md
│     │    ├── 📄NextJs学习-bff route.md
│     │    ├── 📄NextJs学习-Data Fetching-2024.md
│     │    ├── 📄NextJs学习-Next.js多环境部署.md
│     │    ├── 📄NextJs学习-SEO.md
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
|useRouter| app router ➡️ import { useRouter } from 'next/navigation'<br>page router ➡️ import { useRouter } from 'next/router'<br>enables navigation between routes within client components|`push()`,`replace()`,<br>`prefetch()`,`forward()`,<br>`back()`, `query`|'pages/[slug].js' <=>`router.query.slug` ||

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

- [nextJs example-official](https://github.com/vercel/next.js/tree/canary/examples)
- [tutorialspoint-nextjs](https://www.tutorialspoint.com/nextjs/index.htm)
- [nextjs文档](https://nextjs.frontendx.cn/)
