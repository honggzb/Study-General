import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class AuthorCount {

    @Field(() => Int, {nullable:false})
    books?: number;
}
