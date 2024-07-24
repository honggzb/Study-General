import { Injectable } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BooksService {

  constructor(private prisma: PrismaService) {}

  create(createBookInput: Prisma.BookUncheckedCreateInput) {
    // return {
    //   id: '1',
    //   name: 'xiyou',
    //   type: 'mohuang',
    //   author:  {
    //     id: '1',
    //     name: 'wuchengen',
    //     gender: 1,
    //     email: 'xxx@gmail.co',
    //   },
    // };
    return this.prisma.book.create({
      data: createBookInput,
    });
  }

  findAll() {
    // return [
    //   { exampleField: 1 },
    //   { exampleField: 2 },
    //   { exampleField: 3 },
    // ];
    return this.prisma.book.findMany({
      // include: {
      //   author: true,
      // },
    });
  }

}
