import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { AuthorCountOrderByAggregateInput } from './author-count-order-by-aggregate.input';
import { AuthorAvgOrderByAggregateInput } from './author-avg-order-by-aggregate.input';
import { AuthorMaxOrderByAggregateInput } from './author-max-order-by-aggregate.input';
import { AuthorMinOrderByAggregateInput } from './author-min-order-by-aggregate.input';
import { AuthorSumOrderByAggregateInput } from './author-sum-order-by-aggregate.input';

@InputType()
export class AuthorOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    gender?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    email?: keyof typeof SortOrder;

    @Field(() => AuthorCountOrderByAggregateInput, {nullable:true})
    _count?: AuthorCountOrderByAggregateInput;

    @Field(() => AuthorAvgOrderByAggregateInput, {nullable:true})
    _avg?: AuthorAvgOrderByAggregateInput;

    @Field(() => AuthorMaxOrderByAggregateInput, {nullable:true})
    _max?: AuthorMaxOrderByAggregateInput;

    @Field(() => AuthorMinOrderByAggregateInput, {nullable:true})
    _min?: AuthorMinOrderByAggregateInput;

    @Field(() => AuthorSumOrderByAggregateInput, {nullable:true})
    _sum?: AuthorSumOrderByAggregateInput;
}
