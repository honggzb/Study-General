import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class AuthorAvgAggregate {

    @Field(() => Float, {nullable:true})
    gender?: number;
}
