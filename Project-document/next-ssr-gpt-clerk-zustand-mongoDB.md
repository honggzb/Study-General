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

[⬆ back to top](#top)

