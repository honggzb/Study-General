import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { BookCreateManyInput } from './book-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyBookArgs {

    @Field(() => [BookCreateManyInput], {nullable:false})
    @Type(() => BookCreateManyInput)
    data!: Array<BookCreateManyInput>;
}
