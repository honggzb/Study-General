[Next.js AI Chatbot using ChatGPT (Open AI)  and Gemini AI](#top)

- [User authentication - using clerk](#user-authentication---using-clerk)
  - [Custom sign-in and sign-up pages](#custom-sign-in-and-sign-up-pages)
  - [Show logged-in user details](#show-logged-in-user-details)
- [MongoDB - using mongoose](#mongodb---using-mongoose)
- [UI and statement of App](#ui-and-statement-of-app)
  - [tailwind theme css](#tailwind-theme-css)
  - [tailwind responsive](#tailwind-responsive)
- [Vercel AI SDK](#vercel-ai-sdk)
  - [Enabling CORS in a Next.js App](#enabling-cors-in-a-nextjs-app)
  - [Intergate Vercle AI](#intergate-vercle-ai)
- [Scroll to bottom while messages showing](#scroll-to-bottom-while-messages-showing)
- [客户端渲染CSR（Client Side Rendering）](#客户端渲染csrclient-side-rendering)
- [服务端渲染SSR（Server Side Rendering）](#服务端渲染ssrserver-side-rendering)
- [同构渲染（Isomorphic render）](#同构渲染isomorphic-render)
- [静态站点生成SSG（Static Site Generation）](#静态站点生成ssgstatic-site-generation)

----------------------------------------

- `npx create-next-app@latest`

```
📂src/
├── 📂 actions/                     - mongoDB API CRUD
│   ├── 📄 chats.ts
│   └── 📄 users.ts
├── 📂 app/
│   ├── 📂 _components/             - layout
│   │    ├── 📄 chat-area.tsx
│   │    ├── 📄 messages.tsx
│   │    └── 📄 sidebar.tsx
│   ├── 📂 api/chat/
│   │    └── 📄 route.tsx
│   ├── 📂 sign-in/[[...sign-in]]/
│   │    └── 📄 page.tsx             - custom sign-in page
│   ├── 📂 sign-up/[[...sign-up]]/
│   │    └── 📄 page.tsx             - custom sign-up page
│   ├── 📄 globals.css
│   ├── 📄 layout.tsx
│   └── 📄 page.tsx
├── 📂 config/
│   └── 📄 db.ts
├── 📂 custom-layout/
│   └── 📄 idex.tsx
├── 📂 models/                       - mongoDB Models
│   ├── 📄 chat-model.ts
│   └── 📄 user-model.ts
├── 📂 store/                        - zustand state
│   ├── 📄 chats-store.ts
│   └── 📄 users-store.ts
├── 📄 middleware.ts         - clerkMiddleware
```



## User authentication - using clerk

- `npm install @clerk/nextjs`
  - [@clerk/nextjs](https://clerk.com/docs/quickstarts/nextjs)
- Set environment variables
  - Navigate to the [Clerk Dashboard](https://dashboard.clerk.com/apps/app_2k86GH317bJ7TbzCOm2QwHJMJg3/instances/ins_2k86GL9Z0NP0ySw728Jtl8XMkC1)
  - In the navigation sidebar, select API Keys
  - In the Quick Copy section, copy your Clerk publishable and secret key.
  - Paste your keys into your '.env' file
- create 'src\middleware.ts'
  - [clerkMiddleware](https://clerk.com/docs/references/nextjs/clerk-middleware) --> Protect all routes
- Add `ClerkProvider` to `src\app\layout.tsx`

```ts
// src\middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);
export default clerkMiddleware((auth, request) => {
  if(!isPublicRoute(request)) {
    auth().protect();
  }
});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
//src\app\layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "My GPT - local",
  description: "An AI GPT of next app",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

[⬆ back to top](#top)

### Custom sign-in and sign-up pages

- [Build your own sign-in and sign-up pages for your Next.js app with Clerk](https://clerk.com/docs/references/nextjs/custom-signup-signin-pages?_gl=1*1cxt5b6*_gcl_au*Nzk1OTc5NzMxLjE3MjI0NzE3NDg.*_ga*MTM4ODgwNTI2Mi4xNzIyNDcxNzQ4*_ga_1WMF5X234K*MTcyMjY1MjU0MS4yLjEuMTcyMjY1Mjc1Ni4wLjAuMA..)
- Build a sign-up page --> `app/sign-up/[[...sign-up]]/page.tsx`
- Build a sign-in page --> `app/sign-in/[[...sign-in]]/page.tsx`
- Update environment variables --> `.env`
  - `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
  - `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
- user1:
  - hong hong
  - honggzb@gmail.com  Newyear11!
- user2:
  - h Q
  - gzbhong@gmail.com  qianhui87

### Show logged-in user details

- `import { currentUser } from "@clerk/nextjs/server";`
- `const user = await currentUser();`

[⬆ back to top](#top)

## MongoDB - using mongoose

- `npm i mongoose`
- create new file --> 'src\config\db.ts'   --> connect DB
- create new file --> 'src\models\user-model.ts'
- create new file --> 'src\actions\users.ts'  --> Model

[⬆ back to top](#top)

## UI and statement of App

- `npm install antd --save`
- `npm install zustand --save`
- `npm i lucide-react`  --> icon

### tailwind theme css

1. edit 'tailwind.config.ts'
2. using in component
   1. `<div className="w-80 bg-sidebar p-3">`
   2. `<div className= bg-chatarea">`

```ts
//tailwind.config.ts
theme: {
    extend: {
      colors: {
        sidebar: "#202222",
        chatarea: "#191A1A",
      },
    },
  },
```

### tailwind responsive

- `lg:hidden`  --> `<Menu className="text-white flex lg:hidden"></Menu>`

[⬆ back to top](#top)

## Vercel AI SDK

- [Vercel AI SDK](https://sdk.vercel.ai/docs/introduction) is the TypeScript toolkit designed to help developers build AI-powered applications with React, Next.js, Vue, Svelte, Node.js, and more
- supports OpenAI, Azure, Anthropic, Amazon Bedrock, Google Generative AI, Mistral, Groq, Perplexity, Fireworks, Cohere
- [Templates](https://sdk.vercel.ai/docs/introduction#why-use-the-vercel-ai-sdk)
  - [Next.js AI Chatbot](https://vercel.com/templates/next.js/nextjs-ai-chatbot)
  - [Gemini AI Chatbot](https://vercel.com/templates/next.js/gemini-ai-chatbot)
- [AI SDK UI- chatbot](https://sdk.vercel.ai/docs/ai-sdk-ui/chatbot)

### Enabling CORS in a Next.js App

- https://vercel.com/guides/how-to-enable-cors
- [Using CORS in Next.js to handle cross-origin requests](https://blog.logrocket.com/using-cors-next-js-handle-cross-origin-requests/)
- modify 'next.config.js'

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/chat/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
};
export default nextConfig;
```

### Intergate Vercle AI

1. `npm i ai @ai-sdk/openai @ai-sdk/google`
2. `npm i react-markdown`

[⬆ back to top](#top)

## Scroll to bottom while messages showing

```ts
//src\app\_components\messages.tsx
function Messages({messages, isLoading}: { messages: any[], isLoading: boolean }) {
  //...
  const messagesRef = React.useRef<any>(null);
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);
//...
return (<div className="..." ref={messagesRef}> ... </div>)
```

------------------------------------------------------------

[前端基础渲染模式-CSR、SSR、同构、静态化](#top)

----------------------------------------------------------------

- 可以单纯的把渲染理解为：渲染就是将页面数据和页面模版组装成html的过程
- ![前端渲染模式演进史](前端渲染模式演进史.png)

## 客户端渲染CSR（Client Side Rendering）

- CSR在浏览器上执行 JavaScript 以生成 DOM 并显示内容的渲染方法， 其大致流程如下
  1. 浏览器向前端服务器请求 html 和 js
  2. html 页面为空，初始加载不显示任何内容，通过执行 js 渲染内容
  3. 通过后端暴露的 API 进行交互
- ![CSR](CSR.png)
- ![CSR1](CSR1.png)
- 优势
  - 过程在客户端进行，服务器直接转发静态html资源|服务器压力小，只用进行转发较小的静态页面
  - 前后端分离，代码逻辑更清晰，不需要考虑代码能不能在服务端运行，不需要考虑服务端的一些注意事项
  - 可以进行局部刷新，无需每次请求完整页面、交互好可实现各种效果
- 劣势
  - 不利于 SEO：网络爬虫可能看不到完整的程序源码，获取不到页面关键信息。不过现在有的搜索引擎也可以了
  - 首屏渲染慢：渲染前需要下载一堆js和css等，而且很多并不是首页需要的js和css，不过按需加载也可以加快首屏加载，下载js和解析js的时间成本都不太低


## 服务端渲染SSR（Server Side Rendering）

- 过程在服务端进行，客户端不需要渲染页面， SSR 的流程大致如下：
  1. 后端服务通过数据层进行查询用户所需内容
  2. 处理业务逻辑
  3. 使用模板拼接页面
  4. 将渲染好的 HTML 字符串返回给客户端
  5. 前端渲染并加载 JS 脚本完成剩余交互
- ![SSR](SSR.png)
- 优势
  - 首屏渲染快
  - 利于SEO
  - 可以生成缓存片段
  - 生成静态化文件
  - 客户端资源更小，对用户来说更节能（对比客户端渲染的耗电）
- 劣势
  - 传统服务端渲染的用户体验较差、不容易维护，通常前端改了部分html或者css，后端也需要修改
  - 服务器压力大，可以用静态化来解决
  - 需要考虑服务端的一些注意事项

[⬆ back to top](#top)

## 同构渲染（Isomorphic render）

- SSR一般指的是首屏服务端渲染或同构渲染（Isomorphic render），即新开页面访问 SSR 应用时，首屏会返回完整的 html，浏览器通过注水（hydrate）成为 React 或 Vue 应用，后续用户进行跳转等操作时不会再向服务端请求 html，而是以类似单页应用的方式进行
  - **脱水（dehydrate）**: 将组件树序列化成静态的 HTML 片段，能直接看到初始视图，不过已经无法与之交互了，但这种便携的形态尤其适合网络传输。这个脱去动态数据，成为风干标本一样的静态快照的过程被称为脱水
  - **注水（hydrate）**:与脱水相反，将这个 html 躯干复活为 Vue 应用的过程称为注水。客户端并不重新生成 HTML 组件，而是重用服务器发送给它的 HTML，并附加「数据」与「交互性」，构建成完整的 Vue 应用，这个过程被称为注水
- **同构**是指写一份代码但可同时在浏览器和服务器中运行的应用。为了同时拥有 ssr 和 csr 的特点，当前流行的方案就是 ssr + csr 同构，比如现在比较流行的的 Next.js
  -
- **同构渲染**也就是指：在服务端先进行渲染一次（SSR，组装页面html内容），客户端拿到代码后，再进行渲染一次（CSH（client-side hydration），也就是 hydrate，主要对 html 进行事件绑定和内容校验，如果 hydrate 发现内容不一致的话，会在开发环境提示警告），后续页面的所有操作和渲染行为都和 CSR 一致（didMount后的更新页面内容都属于正常的CSR了）
- 在服务端渲染中，有两种页面渲染的方式：
  - 后端服务器获取数据并组装 HTML 返回给浏览器解析渲染页面
  - 浏览器在交互过程中，请求新的数据并动态更新渲染页面

[⬆ back to top](#top)

## 静态站点生成SSG（Static Site Generation）



> references
- [Next.js](https://nextjs.org/)
- [Next.js中文网](https://www.nextjs.cn/)
- [一文带你了解前端渲染模式演进史](https://juejin.cn/post/7293500966212583465)





