import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { AuthorUpdateWithoutBooksInput } from './author-update-without-books.input';
import { Type } from 'class-transformer';
import { AuthorCreateWithoutBooksInput } from './author-create-without-books.input';
import { AuthorWhereInput } from './author-where.input';

@InputType()
export class AuthorUpsertWithoutBooksInput {

    @Field(() => AuthorUpdateWithoutBooksInput, {nullable:false})
    @Type(() => AuthorUpdateWithoutBooksInput)
    update!: AuthorUpdateWithoutBooksInput;

    @Field(() => AuthorCreateWithoutBooksInput, {nullable:false})
    @Type(() => AuthorCreateWithoutBooksInput)
    create!: AuthorCreateWithoutBooksInput;

    @Field(() => AuthorWhereInput, {nullable:true})
    @Type(() => AuthorWhereInput)
    where?: AuthorWhereInput;
}
