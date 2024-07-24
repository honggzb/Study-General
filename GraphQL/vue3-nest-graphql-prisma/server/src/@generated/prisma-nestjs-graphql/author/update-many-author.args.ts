import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AuthorUpdateManyMutationInput } from './author-update-many-mutation.input';
import { Type } from 'class-transformer';
import { AuthorWhereInput } from './author-where.input';

@ArgsType()
export class UpdateManyAuthorArgs {

    @Field(() => AuthorUpdateManyMutationInput, {nullable:false})
    @Type(() => AuthorUpdateManyMutationInput)
    data!: AuthorUpdateManyMutationInput;

    @Field(() => AuthorWhereInput, {nullable:true})
    @Type(() => AuthorWhereInput)
    where?: AuthorWhereInput;
}
