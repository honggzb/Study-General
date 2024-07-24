import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AuthorCreateInput } from './author-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneAuthorArgs {

    @Field(() => AuthorCreateInput, {nullable:false})
    @Type(() => AuthorCreateInput)
    data!: AuthorCreateInput;
}
