import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AuthorWhereInput } from './author-where.input';
import { Type } from 'class-transformer';
import { AuthorOrderByWithAggregationInput } from './author-order-by-with-aggregation.input';
import { AuthorScalarFieldEnum } from './author-scalar-field.enum';
import { AuthorScalarWhereWithAggregatesInput } from './author-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { AuthorCountAggregateInput } from './author-count-aggregate.input';
import { AuthorAvgAggregateInput } from './author-avg-aggregate.input';
import { AuthorSumAggregateInput } from './author-sum-aggregate.input';
import { AuthorMinAggregateInput } from './author-min-aggregate.input';
import { AuthorMaxAggregateInput } from './author-max-aggregate.input';

@ArgsType()
export class AuthorGroupByArgs {

    @Field(() => AuthorWhereInput, {nullable:true})
    @Type(() => AuthorWhereInput)
    where?: AuthorWhereInput;

    @Field(() => [AuthorOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<AuthorOrderByWithAggregationInput>;

    @Field(() => [AuthorScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof AuthorScalarFieldEnum>;

    @Field(() => AuthorScalarWhereWithAggregatesInput, {nullable:true})
    having?: AuthorScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => AuthorCountAggregateInput, {nullable:true})
    _count?: AuthorCountAggregateInput;

    @Field(() => AuthorAvgAggregateInput, {nullable:true})
    _avg?: AuthorAvgAggregateInput;

    @Field(() => AuthorSumAggregateInput, {nullable:true})
    _sum?: AuthorSumAggregateInput;

    @Field(() => AuthorMinAggregateInput, {nullable:true})
    _min?: AuthorMinAggregateInput;

    @Field(() => AuthorMaxAggregateInput, {nullable:true})
    _max?: AuthorMaxAggregateInput;
}
