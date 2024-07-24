import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { AuthorCountAggregate } from './author-count-aggregate.output';
import { AuthorAvgAggregate } from './author-avg-aggregate.output';
import { AuthorSumAggregate } from './author-sum-aggregate.output';
import { AuthorMinAggregate } from './author-min-aggregate.output';
import { AuthorMaxAggregate } from './author-max-aggregate.output';

@ObjectType()
export class AggregateAuthor {

    @Field(() => AuthorCountAggregate, {nullable:true})
    _count?: AuthorCountAggregate;

    @Field(() => AuthorAvgAggregate, {nullable:true})
    _avg?: AuthorAvgAggregate;

    @Field(() => AuthorSumAggregate, {nullable:true})
    _sum?: AuthorSumAggregate;

    @Field(() => AuthorMinAggregate, {nullable:true})
    _min?: AuthorMinAggregate;

    @Field(() => AuthorMaxAggregate, {nullable:true})
    _max?: AuthorMaxAggregate;
}
