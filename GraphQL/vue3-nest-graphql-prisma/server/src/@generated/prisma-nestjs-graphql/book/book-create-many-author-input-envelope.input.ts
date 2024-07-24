import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BookCreateManyAuthorInput } from './book-create-many-author.input';
import { Type } from 'class-transformer';

@InputType()
export class BookCreateManyAuthorInputEnvelope {

    @Field(() => [BookCreateManyAuthorInput], {nullable:false})
    @Type(() => BookCreateManyAuthorInput)
    data!: Array<BookCreateManyAuthorInput>;
}
