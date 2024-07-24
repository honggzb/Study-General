import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { BookCountAggregate } from './book-count-aggregate.output';
import { BookMinAggregate } from './book-min-aggregate.output';
import { BookMaxAggregate } from './book-max-aggregate.output';

@ObjectType()
export class BookGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    type?: string;

    @Field(() => String, {nullable:false})
    authorId!: string;

    @Field(() => BookCountAggregate, {nullable:true})
    _count?: BookCountAggregate;

    @Field(() => BookMinAggregate, {nullable:true})
    _min?: BookMinAggregate;

    @Field(() => BookMaxAggregate, {nullable:true})
    _max?: BookMaxAggregate;
}
