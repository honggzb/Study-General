import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '.prisma/client';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  create(author: Prisma.AuthorCreateInput) {
    return this.prisma.author.create({
      data: author,
    });
  }

  findAll() {
    return this.prisma.author.findMany({
      include: {
        books: true,
      },
    });
  }

  findOneById(id) {
    return this.prisma.author.findUnique({
      where: {
        id,
      },
    });
  }
}