[Set up Prisma ORM](#top)

- [Setup](#setup)
- [Start from scratch](#start-from-scratch)
  - [Relational databases](#relational-databases)
  - [MongoDB](#mongodb)
- [Add to existing project](#add-to-existing-project)
  - [Relational databases](#relational-databases-1)
  - [MongoDB](#mongodb-1)

---------------------------------------------

1. `npm install -D prisma`
2. `npx prisma init`
3. add model to 'prisma/schema.prisma' file

## Start from scratch

### Relational databases

1. Connecting your database: modify 'prisma/schema.prisma' file
2. Prisma Migrate
   1. Add the data model to 'prisma/schema.prisma' file
   2. `npx prisma migrate dev --name init`
      1. creates a new SQL migration file(prisma/migrations/**.*/) for this migration
      2. runs the SQL migration file against the database
3. Install Prisma Client: `npm install @prisma/client`
4. Querying the database:
   1. Create a new file named 'index.ts' and add the following code to it
   2. Run the code: `npx ts-node index.ts` if use ts-node

```ts
//index.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: { title: 'Hello World' },
      },
      profile: {
        create: { bio: 'I like turtles' },
      },
    },
  })
  const allUsers = await prisma.user.findMany({
    include: { posts: true,profile: true },
  })
  console.dir(allUsers, { depth: null })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

[⬆ back to top](#top)

### MongoDB

1. Connecting your database: modify 'prisma/schema.prisma' file
2. Add the data model to 'prisma/schema.prisma' file
3. Install Prisma Client: `npm install @prisma/client`
4. Querying the database
   1. Create a new file named 'index.ts' and add the following code to it
   2. Run the code: `npx ts-node index.ts` if use ts-node

```ts
//index.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  await prisma.user.create({
    data: {
      name: 'Rich',
      email: 'hello@prisma.com',
      posts: {
        create: {
          title: 'My first post',
          body: 'Lots of really interesting stuff',
          slug: 'my-first-post',
        },
      },
    },
  })
  const allUsers = await prisma.user.findMany({
    include: { posts: true },
  })
  console.dir(allUsers, { depth: null })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

[⬆ back to top](#top)

## Add to existing project

### Relational databases

1. Connecting your database: modify 'prisma/schema.prisma' file
2. Introspect database with Prisma ORM
   - `npx prisma db pull`
3. Baseline database: initializing migration history for a database
   1. create a migrations directory and add a directory inside with preferred name for the migration: `mkdir -p prisma/migrations/0_init`
   2. generate the migration file: `npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql`
   3. mark the migration as applied using prisma migrate resolve with the `--applied` argument: `npx prisma migrate resolve --applied 0_init`
4. Install Prisma Client: `npm install @prisma/client`
5. Querying the database:
   1. Create a new file named 'index.ts' and add the following code to it
   2. Run the code: `npx ts-node index.ts` if use ts-node

[⬆ back to top](#top)

### MongoDB

1. Connecting your database: modify 'prisma/schema.prisma' file
2. Introspect database with Prisma ORM
   1. create database in MongoDB
   2. Initializing Prisma ORM: `npx prisma db pull`
3. Install Prisma Client: `npm install @prisma/client`
4. Querying the database
   1. Create a new file named 'index.ts' and add the following code to it
   2. Run the code: `npx ts-node index.ts` if use ts-node

[⬆ back to top](#top)

> https://www.prisma.io/docs/getting-started
