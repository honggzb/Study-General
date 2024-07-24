import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class AuthorAvgOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    gender?: keyof typeof SortOrder;
}
