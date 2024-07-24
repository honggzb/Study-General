import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class AuthorAvgAggregateInput {

    @Field(() => Boolean, {nullable:true})
    gender?: true;
}
