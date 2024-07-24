import { AuthorsService } from '../authors/authors.service';
import {
  Args,
  Mutation,
  Parent,
  Query,
  Resolver,
  ResolveProperty,
} from '@nestjs/graphql';
import { AuthorCreateInput } from '../@generated/prisma-nestjs-graphql/author/author-create.input';

@Resolver('Book')
export class BooksAuthorResolver {
  constructor(private authorsService: AuthorsService) {}

  @Query('authors')
  getAuthors() {
    return this.authorsService.findAll();
  }

  @Mutation('createAuthor')
  async create(@Args('createAuthorInput') args: AuthorCreateInput) {
    return this.authorsService.create(args);
  }

  @ResolveProperty()
  async author(@Parent() book) {
    return this.authorsService.findOneById(book.authorId);
  }
}