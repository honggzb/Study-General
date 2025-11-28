
- [project structure](#project-structure)
- [Add Prisma ORM to an existing MongoDB project](#add-prisma-orm-to-an-existing-mongodb-project)

## project structure

```
├─ 📂app/
│  ├─ 📂api/
│  │  └─ 📂list/
│  │     └─ 📄route.ts
│  ├─ 📄layout.tsx
│  └─ 📄page.tsx
├─ 📂components/
│  ├─ 📂list-box/
│  │  └─ 📄index.tsx
│  ├─ 📂list-card/
│  │  └─ 📄index.tsx
│  ├─ 📂list-show/
│  │  └─ 📄index.tsx
│  └─ 📂ui/                  - shadcn ui
│     ├─ 📄card.tsx
│     └─ 📄skeleton.tsx
├─ 📂generated/              - prisma
├─ 📂lib/
│  ├─ 📄prisma.ts
│  └─ 📄utils.ts             - shadcn ui
├─ 📂prisma/
│  └─ 📄schema.prisma
├─ 📄next.config.ts
├─ 📄prisma.config.ts
```

## Add Prisma ORM to an existing MongoDB project

1. Set up Prisma ORM
   - `npm install prisma@6.19 --save-dev`
     - note: MongoDB did not support Prisma ORM v7 now(2025-11)
   - `npm install @prisma/client@6.19 dotenv`
2. Initialize Prisma ORM
   - `npx prisma init --datasource-provider mongodb --output ../generated/prisma`
     - Creates a 'prisma/schema.prisma' **-->** containing your database connection configuration
     - Creates a '.env' file in the root directory **-->** environment variables
     - Creates a 'prisma.config.ts' file **-->** Prisma configuration
   - Add dotenv to 'prisma.config.ts' so that Prisma can load environment variables from your .'env' file
     - `import 'dotenv/config'`
   - Add schema to 'prisma/schema.prisma' file
3. Connect your database
   1. add `DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/mydb"` to '.env' file
4. Generate Prisma ORM types
   - `npx prisma generate`
     - generated 'generated/prisma' directory and a type-safe Prisma Client tailored to your database schema in the 'generated/prisma'
5. Instantiate Prisma Client
   1. Create a utility file('lib/prisma.ts') to instantiate Prisma Client
6. update schema
   1. Update your Prisma schema file
   2. Push the changes to your database: `npx prisma db push`

> references
- [Prisma cn document](https://prisma.yoga/getting-started)
- [Add Prisma ORM to an existing MongoDB project](https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/mongodb)
