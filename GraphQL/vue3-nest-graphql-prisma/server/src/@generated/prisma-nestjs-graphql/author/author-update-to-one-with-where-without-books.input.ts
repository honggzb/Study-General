import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { AuthorWhereInput } from './author-where.input';
import { Type } from 'class-transformer';
import { AuthorUpdateWithoutBooksInput } from './author-update-without-books.input';

@InputType()
export class AuthorUpdateToOneWithWhereWithoutBooksInput {

    @Field(() => AuthorWhereInput, {nullable:true})
    @Type(() => AuthorWhereInput)
    where?: AuthorWhereInput;

    @Field(() => AuthorUpdateWithoutBooksInput, {nullable:false})
    @Type(() => AuthorUpdateWithoutBooksInput)
    data!: AuthorUpdateWithoutBooksInput;
}
