import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Book } from '../book/book.model';
import { AuthorCount } from './author-count.output';

@ObjectType()
export class Author {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => Int, {nullable:false})
    gender!: number;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => [Book], {nullable:true})
    books?: Array<Book>;

    @Field(() => AuthorCount, {nullable:false})
    _count?: AuthorCount;
}
