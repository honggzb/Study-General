import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import * as Validator from 'class-Validator';
import { BookWhereInput } from './book-where.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { AuthorRelationFilter } from '../author/author-relation-filter.input';

@InputType()
export class BookWhereUniqueInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:true})
    @Validator.MinLength(1)
    name?: string;

    @Field(() => [BookWhereInput], {nullable:true})
    AND?: Array<BookWhereInput>;

    @Field(() => [BookWhereInput], {nullable:true})
    OR?: Array<BookWhereInput>;

    @Field(() => [BookWhereInput], {nullable:true})
    NOT?: Array<BookWhereInput>;

    @Field(() => StringNullableFilter, {nullable:true})
    type?: StringNullableFilter;

    @Field(() => StringFilter, {nullable:true})
    authorId?: StringFilter;

    @Field(() => AuthorRelationFilter, {nullable:true})
    author?: AuthorRelationFilter;
}
