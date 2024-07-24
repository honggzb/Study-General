import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import * as Validator from 'class-Validator';

@InputType()
export class BookCreateManyInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    @Validator.MinLength(1)
    name!: string;

    @Field(() => String, {nullable:true})
    type?: string;

    @Field(() => String, {nullable:false})
    authorId!: string;
}
