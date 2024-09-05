[有用的和常用的](#top)

- [shadcn for Next.js](#shadcn-for-nextjs)
- [Prisma setup](#prisma-setup)
- [Data fetch-CRUD](https://github.com/honggzb/Study-General/blob/master/React/NextJS/NextJs%E5%AD%A6%E4%B9%A0-Data%20Fetching.md)
- [using google font in nextjs](#using-google-font-in-nextjs)
- [date-fns](#date-fns)

-------------------------------------------------------------------------

- `npx create-next-app@latest --typescript --eslint`

## shadcn for Next.js

- [shadcn for Next.js](https://ui.shadcn.com/docs/installation/next)
- `npx shadcn@latest init`
- `npx shadcn-ui@latest add card input label dialog`

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

## using google font in nextjs

- find font name in [google font](https://fonts.google.com/)
- modify 'src\app\layout.js'

```ts
//src\app\layout.js
import { Reddit_Mono } from "next/font/google";
const reddit = Reddit_Mono({ subsets: ["latin"] });
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${reddit.className}`}>
        {children}
      </body>
    </html>
  );
}
```

[⬆ back to top](#top)

## date-fns

- `npm install date-fns -D`
- [date-fns](https://date-fns.org/docs/Getting-Started): Modern JavaScript date utility library
- `<p className="text-sm font-light ml-auto">{formatDistance(new Date(postData.createAt), new Date())}</p>`

[⬆ back to top](#top)
