import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { BookUncheckedCreateInput } from '../@generated/prisma-nestjs-graphql/book/book-unchecked-create.input';

@Resolver('Book')
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation('createBook')
  create(@Args('createBookInput') createBookInput: BookUncheckedCreateInput) {
    return this.booksService.create(createBookInput);
  }

  @Query('books')
  findAll() {
    return this.booksService.findAll();
  }

}
