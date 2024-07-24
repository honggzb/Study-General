import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await Promise.all([
    prisma.author.create({
      data: {
        name: '莫言',
        gender: 1,
        email: 'moyan@gmail.com',
        books: {
          createMany: {
            data: {
              name: '生死疲劳',
              type: '魔幻',
            },
          },
        },
      },
    }),
    prisma.author.create({
      data: {
        name: '鲁迅',
        gender: 1,
        email: 'luxun@gmail.com',
        books: {
          createMany: {
            data: {
              name: '呐喊',
              type: '人文',
            },
          },
        },
      },
    }),
    prisma.author.create({
      data: {
        name: '张爱玲',
        gender: 2,
        email: 'zhangailing@gmail.com',
        books: {
          createMany: {
            data: {
              name: '红玫瑰与白玫瑰',
              type: '爱情',
            },
          },
        },
      },
    }),
  ]);

  const result = await prisma.book.findMany({
    include: {
      author: true,
    },
  });
  console.log('books:', JSON.stringify(result));
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });