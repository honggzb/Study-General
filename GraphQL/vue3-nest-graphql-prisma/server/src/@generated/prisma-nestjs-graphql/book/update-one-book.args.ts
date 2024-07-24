import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { BookUpdateInput } from './book-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { BookWhereUniqueInput } from './book-where-unique.input';

@ArgsType()
export class UpdateOneBookArgs {

    @Field(() => BookUpdateInput, {nullable:false})
    @Type(() => BookUpdateInput)
    data!: BookUpdateInput;

    @Field(() => BookWhereUniqueInput, {nullable:false})
    @Type(() => BookWhereUniqueInput)
    where!: Prisma.AtLeast<BookWhereUniqueInput, 'id' | 'name'>;
}
