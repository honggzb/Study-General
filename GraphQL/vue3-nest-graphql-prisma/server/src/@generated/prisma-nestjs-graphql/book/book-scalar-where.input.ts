import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';

@InputType()
export class BookScalarWhereInput {

    @Field(() => [BookScalarWhereInput], {nullable:true})
    AND?: Array<BookScalarWhereInput>;

    @Field(() => [BookScalarWhereInput], {nullable:true})
    OR?: Array<BookScalarWhereInput>;

    @Field(() => [BookScalarWhereInput], {nullable:true})
    NOT?: Array<BookScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    type?: StringNullableFilter;

    @Field(() => StringFilter, {nullable:true})
    authorId?: StringFilter;
}
