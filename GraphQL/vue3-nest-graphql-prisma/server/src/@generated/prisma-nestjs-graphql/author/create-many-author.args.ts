import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AuthorCreateManyInput } from './author-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyAuthorArgs {

    @Field(() => [AuthorCreateManyInput], {nullable:false})
    @Type(() => AuthorCreateManyInput)
    data!: Array<AuthorCreateManyInput>;
}
