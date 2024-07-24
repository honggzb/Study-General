import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import * as Validator from 'class-Validator';
import { BookUncheckedCreateNestedManyWithoutAuthorInput } from '../book/book-unchecked-create-nested-many-without-author.input';

@InputType()
export class AuthorUncheckedCreateInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => Int, {nullable:false})
    gender!: number;

    @Field(() => String, {nullable:false})
    @Validator.IsEmail()
    email!: string;

    @Field(() => BookUncheckedCreateNestedManyWithoutAuthorInput, {nullable:true})
    books?: BookUncheckedCreateNestedManyWithoutAuthorInput;
}
