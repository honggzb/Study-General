import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AuthorWhereInput } from './author-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyAuthorArgs {

    @Field(() => AuthorWhereInput, {nullable:true})
    @Type(() => AuthorWhereInput)
    where?: AuthorWhereInput;
}
