import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { AuthorWhereUniqueInput } from './author-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueAuthorOrThrowArgs {

    @Field(() => AuthorWhereUniqueInput, {nullable:false})
    @Type(() => AuthorWhereUniqueInput)
    where!: Prisma.AtLeast<AuthorWhereUniqueInput, 'id'>;
}
