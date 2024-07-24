import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { BookWhereInput } from './book-where.input';
import { Type } from 'class-transformer';
import { BookOrderByWithRelationInput } from './book-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { BookWhereUniqueInput } from './book-where-unique.input';
import { Int } from '@nestjs/graphql';
import { BookCountAggregateInput } from './book-count-aggregate.input';
import { BookMinAggregateInput } from './book-min-aggregate.input';
import { BookMaxAggregateInput } from './book-max-aggregate.input';

@ArgsType()
export class BookAggregateArgs {

    @Field(() => BookWhereInput, {nullable:true})
    @Type(() => BookWhereInput)
    where?: BookWhereInput;

    @Field(() => [BookOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<BookOrderByWithRelationInput>;

    @Field(() => BookWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<BookWhereUniqueInput, 'id' | 'name'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => BookCountAggregateInput, {nullable:true})
    _count?: BookCountAggregateInput;

    @Field(() => BookMinAggregateInput, {nullable:true})
    _min?: BookMinAggregateInput;

    @Field(() => BookMaxAggregateInput, {nullable:true})
    _max?: BookMaxAggregateInput;
}
