import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { BookCountOrderByAggregateInput } from './book-count-order-by-aggregate.input';
import { BookMaxOrderByAggregateInput } from './book-max-order-by-aggregate.input';
import { BookMinOrderByAggregateInput } from './book-min-order-by-aggregate.input';

@InputType()
export class BookOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    authorId?: keyof typeof SortOrder;

    @Field(() => BookCountOrderByAggregateInput, {nullable:true})
    _count?: BookCountOrderByAggregateInput;

    @Field(() => BookMaxOrderByAggregateInput, {nullable:true})
    _max?: BookMaxOrderByAggregateInput;

    @Field(() => BookMinOrderByAggregateInput, {nullable:true})
    _min?: BookMinOrderByAggregateInput;
}
