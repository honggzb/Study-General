import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { BookCountAggregate } from './book-count-aggregate.output';
import { BookMinAggregate } from './book-min-aggregate.output';
import { BookMaxAggregate } from './book-max-aggregate.output';

@ObjectType()
export class AggregateBook {

    @Field(() => BookCountAggregate, {nullable:true})
    _count?: BookCountAggregate;

    @Field(() => BookMinAggregate, {nullable:true})
    _min?: BookMinAggregate;

    @Field(() => BookMaxAggregate, {nullable:true})
    _max?: BookMaxAggregate;
}
