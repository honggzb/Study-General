[Build & Deploy: Full Stack AI Quiz Platform with NextJS 13, TailwindCSS, OpenAI, Next Auth](#top)

- [shadcn UI](#shadcn-ui)
- [DB setup](#db-setup)
- [NextAuth](#nextauth)
- [Open AI](#open-ai)
- [shortcut](#shortcut)

-----------------------------------------------------------------------

- `npx create-next-app@latest --ts`

```
├── 📂prisma/
├── 📂src/
│   ├── 📂app/
│   │     ├── 📂api/
│   │     │      ├── 📂auth/[...nextauth]/
│   │     │      │     └── 📄route.ts
│   │     │      ├── 📂checkAnswer/
│   │     │      │     └── 📄route.ts
│   │     │      ├── 📂endGame/
│   │     │      │     └── 📄route.ts
│   │     │      ├── 📂game/
│   │     │      │     └── 📄route.ts
│   │     │      └── 📂questions/
│   │     │            └── 📄route.ts
│   │     ├── 📂dashboard/
│   │     │      └── 📄page.tsx
│   │     ├── 📂history/
│   │     │      └── 📄page.tsx
│   │     ├── 📂play/
│   │     │      ├── 📂mcq/[gameId]/
│   │     │      │     └── 📄page.ts
│   │     │      └── 📂open-ended/[gameId]/
│   │     │            └── 📄page.ts
│   │     ├── 📂quiz/
│   │     │      └── 📄page.tsx
│   │     ├── 📂statistics/[gameId]/
│   │     │      └── 📄page.tsx
│   │     ├── 📄favicon.ico
│   │     ├── 📄globals.css
│   │     ├── 📄layout.tsx
│   │     └── 📄page.tsx
│   ├── 📂components/
│   │     ├── 📂dashboard/
│   │     │      ├── 📄HistoryCard.tsx
│   │     │      ├── 📄HotTopicsCard.tsx
│   │     │      ├── 📄QuizMeCard.tsx
│   │     │      └── 📄RecentActivityCard.tsx
│   │     ├── 📂forms/
│   │     │      └── 📄QuizCreation.tsx
│   │     ├── 📂statistics/
│   │     │      ├── 📄AccuracyCard.tsx
│   │     │      ├── 📄QuestionsList.tsx
│   │     │      ├── 📄ResultsCard.tsx
│   │     │      └── 📄TimeTakenCard.tsx
│   │     ├── 📂ui/
│   │     ├── 📄BlankAnswerInput.tsx
│   │     ├── 📄DetailsDialog.tsx
│   │     ├── 📄HistoryComponent.tsx
│   │     ├── 📄LoadingQuestions.tsx
│   │     ├── 📄MCQ.tsx
│   │     ├── 📄MCQCounter.tsx
│   │     ├── 📄Navbar.tsx
│   │     ├── 📄OpenEnded.tsx
│   │     ├── 📄OpenEndedPercentage.tsx
│   │     ├── 📄Providers.tsx
│   │     ├── 📄SignInButton.tsx
│   │     ├── 📄ThemeToggle.tsx
│   │     ├── 📄UserAccountNav.tsx
│   │     ├── 📄UserAvatar.tsx
│   │     └── 📄WordCloud.tsx
│   ├── 📂lib/
│   │     ├── 📄db.ts
│   │     ├── 📄gpt.ts
│   │     ├── 📄nextauth.ts
│   │     └── 📄utils.ts
│   ├── 📂schemas/
│   │     ├── 📂forms/
│   │     │     └── 📄quiz.ts
│   │     └── 📄questions.ts
```

## shadcn UI

- https://ui.shadcn.com/docs/installation/next
-  `npx shadcn-ui@latest init`
   - will create a 'components.json'
- 按需添加组件：
  - `npx shadcn-ui@latest add button`  -> 'components\ui\button.tsx'
  - `npx shadcn-ui@latest add toast`   -> 'components\ui\toast.tsx, toaster.tsx, use-toast.ts'
  - `npx shadcn-ui@latest add dropdown-menu`
  - `npx shadcn-ui@latest add avatar`
  - `npx shadcn-ui@latest add card`
- [Dark mode for nextJS](https://ui.shadcn.com/docs/dark-mode/next)
  1. `npm install next-themes`
  2. Wrap layout provider: 'components\Providers.tsx'
  3. create a component:

[⬆ back to top](#top)

## DB setup

- planetscale:
- [Prisma](https://www.prisma.io/docs/getting-started/quickstart)
  - `npm i prisma -D`
  - `npm i @prisma/client`
  - `npx prisma init --datasource-provider sqlite`
    - will creates a new 'prisma' directory with a 'prisma.schema'
  - modify data in the Prisma schema
  - create `lib/db.ts` file
  - ![Prisma Client](PrismaClient.png)
  - [Prisma cn document](https://prisma.yoga/getting-started)

[⬆ back to top](#top)

## NextAuth

- https://next-auth.js.org/getting-started/example
- `npm install next-auth`
- `npm i @next-auth/prisma-adapter`:  https://next-auth.js.org/v3/adapters/prisma
- create 'lib/nextAuth.ts' file
- create a schema file in 'prisma/schema.prisma'
- `npx prisma db push`
- create 'app\api\auth\[...nextauth]\route.ts' file
- modify 'app\layout.tsx' file
  - [next Auth's sessionprovider](https://next-auth.js.org/getting-started/client#sessionprovider)

## Open AI

- `npm i openai`
- create 'lib\gpt.ts'
- [Strict GPT](https://pastebin.com/EiggjLeq)


## shortcut

- `tsrafce`   ->  TypeScript React Arrow Function Provider
- `new Array(5).fill('hello')`
- [lucide-react](https://lucide.dev/guide/packages/lucide-react):  lucide icon library for react applications
- [react-d3-cloud](https://www.npmjs.com/package/react-d3-cloud): A word cloud react component built with d3-cloud
- [zod](https://zod.dev/): TypeScript-first schema validation with static type inference
- [hookform/resolvers](https://github.com/react-hook-form/resolvers?tab=readme-ov-file#zod): React Hook Form, Performant, flexible and extensible forms with easy to use validation.
- [react query](https://tanstack.com/query/latest/docs/framework/react/overview):  data-fetching library for web applications, it makes fetching, caching, synchronizing and updating server state in your web applications a breeze
  - `npm i @tanstack/react-query`

[⬆ back to top](#top)

> References
- https://github.com/Elliott-Chong/quizmify
- https://www.youtube.com/watch?v=vIyU4nInlt0
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn)- an interactive Next.js tutorial

[⬆ back to top](#top)
