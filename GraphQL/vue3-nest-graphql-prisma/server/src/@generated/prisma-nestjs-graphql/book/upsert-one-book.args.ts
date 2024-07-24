import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { BookWhereUniqueInput } from './book-where-unique.input';
import { Type } from 'class-transformer';
import { BookCreateInput } from './book-create.input';
import { BookUpdateInput } from './book-update.input';

@ArgsType()
export class UpsertOneBookArgs {

    @Field(() => BookWhereUniqueInput, {nullable:false})
    @Type(() => BookWhereUniqueInput)
    where!: Prisma.AtLeast<BookWhereUniqueInput, 'id' | 'name'>;

    @Field(() => BookCreateInput, {nullable:false})
    @Type(() => BookCreateInput)
    create!: BookCreateInput;

    @Field(() => BookUpdateInput, {nullable:false})
    @Type(() => BookUpdateInput)
    update!: BookUpdateInput;
}
