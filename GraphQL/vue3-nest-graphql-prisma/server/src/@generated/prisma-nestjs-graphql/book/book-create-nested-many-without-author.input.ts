import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BookCreateWithoutAuthorInput } from './book-create-without-author.input';
import { Type } from 'class-transformer';
import { BookCreateOrConnectWithoutAuthorInput } from './book-create-or-connect-without-author.input';
import { BookCreateManyAuthorInputEnvelope } from './book-create-many-author-input-envelope.input';
import { Prisma } from '@prisma/client';
import { BookWhereUniqueInput } from './book-where-unique.input';

@InputType()
export class BookCreateNestedManyWithoutAuthorInput {

    @Field(() => [BookCreateWithoutAuthorInput], {nullable:true})
    @Type(() => BookCreateWithoutAuthorInput)
    create?: Array<BookCreateWithoutAuthorInput>;

    @Field(() => [BookCreateOrConnectWithoutAuthorInput], {nullable:true})
    @Type(() => BookCreateOrConnectWithoutAuthorInput)
    connectOrCreate?: Array<BookCreateOrConnectWithoutAuthorInput>;

    @Field(() => BookCreateManyAuthorInputEnvelope, {nullable:true})
    @Type(() => BookCreateManyAuthorInputEnvelope)
    createMany?: BookCreateManyAuthorInputEnvelope;

    @Field(() => [BookWhereUniqueInput], {nullable:true})
    @Type(() => BookWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<BookWhereUniqueInput, 'id' | 'name'>>;
}
