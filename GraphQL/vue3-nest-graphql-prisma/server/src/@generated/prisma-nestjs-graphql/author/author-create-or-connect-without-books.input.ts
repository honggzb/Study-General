import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { AuthorWhereUniqueInput } from './author-where-unique.input';
import { Type } from 'class-transformer';
import { AuthorCreateWithoutBooksInput } from './author-create-without-books.input';

@InputType()
export class AuthorCreateOrConnectWithoutBooksInput {

    @Field(() => AuthorWhereUniqueInput, {nullable:false})
    @Type(() => AuthorWhereUniqueInput)
    where!: Prisma.AtLeast<AuthorWhereUniqueInput, 'id'>;

    @Field(() => AuthorCreateWithoutBooksInput, {nullable:false})
    @Type(() => AuthorCreateWithoutBooksInput)
    create!: AuthorCreateWithoutBooksInput;
}
