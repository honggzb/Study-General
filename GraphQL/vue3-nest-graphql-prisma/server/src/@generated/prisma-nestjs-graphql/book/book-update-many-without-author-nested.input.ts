import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BookCreateWithoutAuthorInput } from './book-create-without-author.input';
import { Type } from 'class-transformer';
import { BookCreateOrConnectWithoutAuthorInput } from './book-create-or-connect-without-author.input';
import { BookUpsertWithWhereUniqueWithoutAuthorInput } from './book-upsert-with-where-unique-without-author.input';
import { BookCreateManyAuthorInputEnvelope } from './book-create-many-author-input-envelope.input';
import { Prisma } from '@prisma/client';
import { BookWhereUniqueInput } from './book-where-unique.input';
import { BookUpdateWithWhereUniqueWithoutAuthorInput } from './book-update-with-where-unique-without-author.input';
import { BookUpdateManyWithWhereWithoutAuthorInput } from './book-update-many-with-where-without-author.input';
import { BookScalarWhereInput } from './book-scalar-where.input';

@InputType()
export class BookUpdateManyWithoutAuthorNestedInput {

    @Field(() => [BookCreateWithoutAuthorInput], {nullable:true})
    @Type(() => BookCreateWithoutAuthorInput)
    create?: Array<BookCreateWithoutAuthorInput>;

    @Field(() => [BookCreateOrConnectWithoutAuthorInput], {nullable:true})
    @Type(() => BookCreateOrConnectWithoutAuthorInput)
    connectOrCreate?: Array<BookCreateOrConnectWithoutAuthorInput>;

    @Field(() => [BookUpsertWithWhereUniqueWithoutAuthorInput], {nullable:true})
    @Type(() => BookUpsertWithWhereUniqueWithoutAuthorInput)
    upsert?: Array<BookUpsertWithWhereUniqueWithoutAuthorInput>;

    @Field(() => BookCreateManyAuthorInputEnvelope, {nullable:true})
    @Type(() => BookCreateManyAuthorInputEnvelope)
    createMany?: BookCreateManyAuthorInputEnvelope;

    @Field(() => [BookWhereUniqueInput], {nullable:true})
    @Type(() => BookWhereUniqueInput)
    set?: Array<Prisma.AtLeast<BookWhereUniqueInput, 'id' | 'name'>>;

    @Field(() => [BookWhereUniqueInput], {nullable:true})
    @Type(() => BookWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<BookWhereUniqueInput, 'id' | 'name'>>;

    @Field(() => [BookWhereUniqueInput], {nullable:true})
    @Type(() => BookWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<BookWhereUniqueInput, 'id' | 'name'>>;

    @Field(() => [BookWhereUniqueInput], {nullable:true})
    @Type(() => BookWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<BookWhereUniqueInput, 'id' | 'name'>>;

    @Field(() => [BookUpdateWithWhereUniqueWithoutAuthorInput], {nullable:true})
    @Type(() => BookUpdateWithWhereUniqueWithoutAuthorInput)
    update?: Array<BookUpdateWithWhereUniqueWithoutAuthorInput>;

    @Field(() => [BookUpdateManyWithWhereWithoutAuthorInput], {nullable:true})
    @Type(() => BookUpdateManyWithWhereWithoutAuthorInput)
    updateMany?: Array<BookUpdateManyWithWhereWithoutAuthorInput>;

    @Field(() => [BookScalarWhereInput], {nullable:true})
    @Type(() => BookScalarWhereInput)
    deleteMany?: Array<BookScalarWhereInput>;
}
