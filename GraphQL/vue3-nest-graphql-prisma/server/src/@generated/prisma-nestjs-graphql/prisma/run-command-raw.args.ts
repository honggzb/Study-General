import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@ArgsType()
export class RunCommandRawArgs {

    @Field(() => GraphQLJSON, {nullable:false})
    command!: any;
}
