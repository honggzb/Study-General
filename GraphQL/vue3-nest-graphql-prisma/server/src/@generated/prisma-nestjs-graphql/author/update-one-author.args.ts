import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AuthorUpdateInput } from './author-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { AuthorWhereUniqueInput } from './author-where-unique.input';

@ArgsType()
export class UpdateOneAuthorArgs {

    @Field(() => AuthorUpdateInput, {nullable:false})
    @Type(() => AuthorUpdateInput)
    data!: AuthorUpdateInput;

    @Field(() => AuthorWhereUniqueInput, {nullable:false})
    @Type(() => AuthorWhereUniqueInput)
    where!: Prisma.AtLeast<AuthorWhereUniqueInput, 'id'>;
}
