import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { BookWhereUniqueInput } from './book-where-unique.input';
import { Type } from 'class-transformer';
import { BookUpdateWithoutAuthorInput } from './book-update-without-author.input';
import { BookCreateWithoutAuthorInput } from './book-create-without-author.input';

@InputType()
export class BookUpsertWithWhereUniqueWithoutAuthorInput {

    @Field(() => BookWhereUniqueInput, {nullable:false})
    @Type(() => BookWhereUniqueInput)
    where!: Prisma.AtLeast<BookWhereUniqueInput, 'id' | 'name'>;

    @Field(() => BookUpdateWithoutAuthorInput, {nullable:false})
    @Type(() => BookUpdateWithoutAuthorInput)
    update!: BookUpdateWithoutAuthorInput;

    @Field(() => BookCreateWithoutAuthorInput, {nullable:false})
    @Type(() => BookCreateWithoutAuthorInput)
    create!: BookCreateWithoutAuthorInput;
}
