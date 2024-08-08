[NextJs学习-AuthJS](#top)

- [Setup AuthJS for nextjs](#setup-authjs-for-nextjs)
- [Session Management of AuthJS](#session-management-of-authjs)
  - [Signin and Signout](#signin-and-signout)
    - [Page Server Side](#page-server-side)
    - [Page Client Side](#page-client-side)
  - [Get Session](#get-session)
- [date-fns](#date-fns)

--------------------------------------

## Setup AuthJS for nextjs

- [AuthJS for nextjs](https://authjs.dev/getting-started/installation?framework=next.js)
1. `npm install next-auth@beta`
2. Setup Environment  -> `npx auth secret`
   1. will generate new file: '.env.local' in root directory
3. create new file: 'src\auth.ts'
4. Add a Route Handler under '/app/api/auth/[...nextauth]/route.ts'
5. [Setup Authentication Methods](https://authjs.dev/getting-started/authentication/oauth)
   1. [Authentication of github](https://authjs.dev/getting-started/authentication/oauth)
   2. go to your github page --> your head icon --> setting -->  Developer settings  --> OAuth App
   3. ![registerGithubApp](registerGithubApp.png)
   4. Setup Environment Variables: add a `Client ID` and `Client Secret` to '.env.local' file
6. Setup github Provider:
   1. adding Provider to 'src\auth.ts' file
   2. Add the handlers to 'api/auth/[...nextauth]/route.ts' file
7. Add Signin Button
8. [Prisma Adapter](https://authjs.dev/getting-started/adapters/prisma): connect to MongoDB
   1.  `npm install @prisma/client @auth/prisma-adapter`
   2.  `npm install prisma --save-dev`
   3.  adding adapter to 'src\auth.ts' file

```ts
//src\auth.ts
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
})
```

[⬆ back to top](#top)

## Session Management of AuthJS

### Signin and Signout

- https://authjs.dev/getting-started/session-management/login

#### Page Server Side

```ts
import { signIn, signOut } from "@/auth.ts"
export function SignIn() {
  return (
    <form action={async () => {
        "use server"
        await signIn()
      }}>
      <button type="submit">Sign in</button>
    </form>
  )
}
export function SignOut() {
  return (
    <form action={async () => {
        "use server"
        await signOut()
      }}>
      <button type="submit">Sign Out</button>
    </form>
  )
}
```

#### Page Client Side

```ts
import { signIn, SignOut } from "next-auth/react"
export function SignIn() {
  return <Button onClick={() => signIn()}>Sign In</Button>
}
export function SignOut() {
  return <button onClick={() => signOut()}>Sign Out</button>
}
```

[⬆ back to top](#top)

### Get Session

- https://authjs.dev/getting-started/session-management/get-session
- Page Server Side  -->
  - `import { auth } from "@/auth";`  --> `const session = await auth();`
- Page Client Side  -->
  - `import { useSession } from "next-auth/react"` --> `const session = useSession()`

[⬆ back to top](#top)

## date-fns

- `npm install date-fns -D`
- [date-fns](https://date-fns.org/docs/Getting-Started): Modern JavaScript date utility library
- `<p className="text-sm font-light ml-auto">{formatDistance(new Date(postData.createAt), new Date())}</p>`

[⬆ back to top](#top)
