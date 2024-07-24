import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class AuthorSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    gender?: true;
}
