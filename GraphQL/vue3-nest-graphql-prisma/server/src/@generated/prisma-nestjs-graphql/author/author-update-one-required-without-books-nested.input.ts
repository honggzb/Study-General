import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { AuthorCreateWithoutBooksInput } from './author-create-without-books.input';
import { Type } from 'class-transformer';
import { AuthorCreateOrConnectWithoutBooksInput } from './author-create-or-connect-without-books.input';
import { AuthorUpsertWithoutBooksInput } from './author-upsert-without-books.input';
import { Prisma } from '@prisma/client';
import { AuthorWhereUniqueInput } from './author-where-unique.input';
import { AuthorUpdateToOneWithWhereWithoutBooksInput } from './author-update-to-one-with-where-without-books.input';

@InputType()
export class AuthorUpdateOneRequiredWithoutBooksNestedInput {

    @Field(() => AuthorCreateWithoutBooksInput, {nullable:true})
    @Type(() => AuthorCreateWithoutBooksInput)
    create?: AuthorCreateWithoutBooksInput;

    @Field(() => AuthorCreateOrConnectWithoutBooksInput, {nullable:true})
    @Type(() => AuthorCreateOrConnectWithoutBooksInput)
    connectOrCreate?: AuthorCreateOrConnectWithoutBooksInput;

    @Field(() => AuthorUpsertWithoutBooksInput, {nullable:true})
    @Type(() => AuthorUpsertWithoutBooksInput)
    upsert?: AuthorUpsertWithoutBooksInput;

    @Field(() => AuthorWhereUniqueInput, {nullable:true})
    @Type(() => AuthorWhereUniqueInput)
    connect?: Prisma.AtLeast<AuthorWhereUniqueInput, 'id'>;

    @Field(() => AuthorUpdateToOneWithWhereWithoutBooksInput, {nullable:true})
    @Type(() => AuthorUpdateToOneWithWhereWithoutBooksInput)
    update?: AuthorUpdateToOneWithWhereWithoutBooksInput;
}
