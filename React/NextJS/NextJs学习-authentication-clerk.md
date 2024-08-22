[NextJs学习-clerk authentication](#top)

- [User authentication - using clerk](#user-authentication---using-clerk)
- [Custom sign-in and sign-up pages](#custom-sign-in-and-sign-up-pages)

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

## Custom sign-in and sign-up pages

- [Build your own sign-in and sign-up pages for your Next.js app with Clerk](https://clerk.com/docs/references/nextjs/custom-signup-signin-pages?_gl=1*1cxt5b6*_gcl_au*Nzk1OTc5NzMxLjE3MjI0NzE3NDg.*_ga*MTM4ODgwNTI2Mi4xNzIyNDcxNzQ4*_ga_1WMF5X234K*MTcyMjY1MjU0MS4yLjEuMTcyMjY1Mjc1Ni4wLjAuMA..)
- Build a sign-up page --> `app/sign-up/[[...sign-up]]/page.tsx`
- Build a sign-in page --> `app/sign-in/[[...sign-in]]/page.tsx`
- Update environment variables --> `.env`
  - `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
  - `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`


> 'next-ssr-gpt-clerk-zustand-mongoDB' project
> [official-Clerk for nextjS](https://clerk.com/docs/quickstarts/nextjs)
