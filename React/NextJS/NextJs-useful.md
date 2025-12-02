[有用的和常用的](#top)

- [Components in NextJS](#components-in-nextjs)
- [Components in NextJS](#components-in-nextjs-1)
- [NextJS route](#nextjs-route)
  - [nextJS route types](#nextjs-route-types)
  - [Navigating](#navigating)
  - [private route](#private-route)
- [fetch Data](#fetch-data)
  - [client side](#client-side)
  - [server side](#server-side)
  - [Data fetch-CRUD](https://github.com/honggzb/Study-General/blob/master/React/NextJS/NextJs%E5%AD%A6%E4%B9%A0-Data%20Fetching-2024.md)
  - [Loading page tip - simulate network delay](#loading-page-tip---simulate-network-delay)
- [Server actions](#server-actions)
- [using Google font](#using-google-font)
- [在nextjs中使用外部image](#在nextjs中使用外部image)
- [Enabling Next.js MCP Server for Coding Agents](#enabling-nextjs-mcp-server-for-coding-agents)
- [Prisma setup](#prisma-setup)
- [date-fns](#date-fns)

-------------------------------------------------------------------------

- `npx create-next-app@latest --typescript --eslint`

## Components in NextJS

```
         NextJS                             |    reactJS
--------------------------------------------|--------------------------------------------------------------
- request to server                         | - request to server
- server prerender html and send to browser | - server send html,js bundles to brower
- browser displays the output               | - browser render the output
                                            | - display
--------------------------------------------|--------------------------------------------------------------
```

## Components in NextJS

```
   Server component                         |    Client component
--------------------------------------------|--------------------------------------------------------------
- pre-renders HTML on server                | - pre-renders HTML on server
- Client-side features(onclick,hooks,       | - Send js code to browser -->
  localstorage) not supported               |   hydration makes it interactive
- No client-side JS send(only HTML)         | - behaves like normal funtional components(with hooks, event)
- Can access server-side resources          |
  (DB, filesystem, secrets)                 | - cannot directly access server-side resources
--------------------------------------------|---------------------------------------------------------------
```

## NextJS route

### nextJS route types

1. basic: `./products`
2. route with params: `./products/5`
3. route with query strings: `./products?pid-5`

```ts
// app\orders\[orderid]\page.tsx
// http://localhost:3000/orders/33
interface SingleOrderPageProps {
  params: { orderid: string }
}
const SingleOrderPage = async ({params}: SingleOrderPageProps) => {
  const {orderid} = await params;
  return (
    <div> Order id is {orderid} </div>
  )
}
export default SingleOrderPage
//=======================================================================
// app\customers\page.tsx
// http://localhost:3000/customers?type=new
interface CustomerPageProps {
  searchParams: {
    [key: string] : string | undefined
  }
}
const CustomerPage = async ({searchParams}: CustomerPageProps) => {
  const { type } = await searchParams;
  return ( <div>{type} Customers</div> )
}
```

### Navigating


```
--------------------------------------------|--------------------------------------------------------------
   Server component                         |    Client component
--------------------------------------------|--------------------------------------------------------------
 - 'useRouter'                              | 'redirect funtion'
--------------------------------------------|---------------------------------------------------------------
```


```ts
// Navigating
   // 1. Client component
'use client'
import { useRouter } from 'next/navigation'
export default function Page() {
  const router = useRouter()
  return (
    <button type="button" onClick={() => router.push('/dashboard')}> Dashboard</button>
  )
}
   // 2. Server component
import { redirect } from 'next/navigation'
async function fetchTeam(id: string) {      // async
  const res = await fetch('https://...')    //
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

### private route

- using `usePathname` to show sth in specific page
1. create 'components\custom-layout.tsx'
2. add `CustomLayout` to 'app\layout.tsx'

```ts
// components\custom-layout.tsx
"use client";
import { usePathname } from "next/navigation"
const CustomLayout = ({children}: {children: React.ReactNode}) => {
  const pathname = usePathname();
  if(pathname === '/login' || pathname === '/register') {
    return <>{ children }</>
  }
  return (
    <div>
      <div>LOGO</div>
      {children}
    </div>
  )
}
export default CustomLayout
// app\layout.tsx
<body className={`${montserrat.className} antialiased`}>
   <CustomLayout>
      {children}
   </CustomLayout>
</body>
```

[⬆ back to top](#top)

## fetch Data

### client side

```ts
"use client";
//...
 const [post, setPosts] = useState([]);
 const fetchPosts = async () => {
    try {
      const res = await fetch("https://xxx");
      const data = await res.json();
      setPosts(data)
    } catch (error) {
      console.log("error fetching posts")
    }
  }
useEffect(() =>{
   fetchPosts();
}, []);
```

### server side

```ts
const ProductsPage = async () => {     // async component
  let products = [];
  try {
     const res = await fetch('https://dummyjson.com/products');
     const data = await res.json();
     products = data.products;
   } catch (error) {
     console.log("Failed to fetch products")
   }
  return (
    <div><ProductsList productsData={products} /></div>
  )
}
export default ProductsPage
```

[⬆ back to top](#top)

### Loading page tip - simulate network delay

```ts
// client side
"use client";
//...
 const [post, setPosts] = useState([]);
 const [loading, setLoading] = useState(false);
 const fetchPosts = async () => {
   try {
      setLoading(true);
      // simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await fetch("https://xxx");
      const data = await res.json();
      setPosts(data)
   } catch (error) {
      console.log("error fetching posts")
   } finally {
      setLoading(false);
   }
  }
useEffect(() =>{
   fetchPosts();
}, []);
//..
{loading ? ( <Loader />) : ( ... )}
//==========================================================
// server side
// method 1:
// create loading.tsx in same directory of component
// method 2:
const ProductsPage = async () => {     // async component
  let products = [];
  try {
     // simulate network delay
     await new Promise((resolve) => setTimeout(resolve, 3000));
     const res = await fetch('https://dummyjson.com/products');
     const data = await res.json();
     products = data.products;
   } catch (error) {
     console.log("Failed to fetch products")
   }
  return (
    <div><ProductsList productsData={products} /></div>
  )
}
export default function Page() {
   // wrapped with Suspense
   return ( <Suspense fallback={<Loader />}><ProductsPage /><Suspense>)
}
```

[⬆ back to top](#top)

## Server actions

- <mark>rules:</mark>
  - file extension must be '.ts' or '.js'
  - always first line should be `use server`
- form --> submit --> server action --> database --> result(success or failure)

[⬆ back to top](#top)

## using Google font

- find font name in [google font](https://fonts.google.com/)
- modify 'src\app\layout.js'

```ts
//app\layout.tsx
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "700"]
});
//...
<body className={`${montserrat.className} ${geistMono.variable} antialiased`}>
```

[⬆ back to top](#top)

## 在nextjs中使用外部image

```ts
//next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        port: '',
      },
    ],
  },
};
```

## Enabling Next.js MCP Server for Coding Agents

- need Next.js 16+
1. install [next-devtools-mcp](https://www.npmjs.com/package/next-devtools-mcp) package
   - `npm i next-devtools-mcp`
2. Add 'next-devtools-mcp' to the `.mcp.json` file at the root of your project

```JSON
{
  "mcpServers": {
    "next-devtools": {
      "command": "npx",
      "args": ["-y", "next-devtools-mcp@latest"]
    }
  }
}
```

[⬆ back to top](#top)

## Prisma setup

- [prisma-Add to existing project-MongoDB](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/mongodb-typescript-mongodb)
  1. `npm install prisma --save-dev`
  2.  `npx prisma`  <-- invoke the Prisma CLI
  3.  `npx prisma init`
      1.  creates a new directory called 'prisma' that contains a file called 'schema.prisma'
      2.  creates the '.env' file in the root directory of the project
  4. modify 'prisma/schema.prisma', add models
  5. `npx prisma generate`
     1. Environment variables loaded from '.env'
     2. Prisma schema loaded from 'prisma\schema.prisma'
  6. `npm install @prisma/client`
  7. create 'src\utils\prisma.js' file

```ts
//src\utils\prisma.js
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();
```

[⬆ back to top](#top)

## date-fns

- `npm install date-fns -D`
- [date-fns](https://date-fns.org/docs/Getting-Started): Modern JavaScript date utility library
- `<p className="text-sm font-light ml-auto">{formatDistance(new Date(postData.createAt), new Date())}</p>`

[⬆ back to top](#top)
