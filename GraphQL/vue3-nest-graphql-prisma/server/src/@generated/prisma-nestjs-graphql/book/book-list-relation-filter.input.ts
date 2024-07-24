import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BookWhereInput } from './book-where.input';

@InputType()
export class BookListRelationFilter {

    @Field(() => BookWhereInput, {nullable:true})
    every?: BookWhereInput;

    @Field(() => BookWhereInput, {nullable:true})
    some?: BookWhereInput;

    @Field(() => BookWhereInput, {nullable:true})
    none?: BookWhereInput;
}
