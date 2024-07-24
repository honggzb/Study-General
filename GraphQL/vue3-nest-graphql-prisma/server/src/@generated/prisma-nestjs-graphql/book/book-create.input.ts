import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import * as Validator from 'class-Validator';
import { AuthorCreateNestedOneWithoutBooksInput } from '../author/author-create-nested-one-without-books.input';

@InputType()
export class BookCreateInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    @Validator.MinLength(1)
    name!: string;

    @Field(() => String, {nullable:true})
    type?: string;

    @Field(() => AuthorCreateNestedOneWithoutBooksInput, {nullable:false})
    author!: AuthorCreateNestedOneWithoutBooksInput;
}
