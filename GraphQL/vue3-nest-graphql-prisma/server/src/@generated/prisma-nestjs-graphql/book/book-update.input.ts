import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { AuthorUpdateOneRequiredWithoutBooksNestedInput } from '../author/author-update-one-required-without-books-nested.input';

@InputType()
export class BookUpdateInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    type?: NullableStringFieldUpdateOperationsInput;

    @Field(() => AuthorUpdateOneRequiredWithoutBooksNestedInput, {nullable:true})
    author?: AuthorUpdateOneRequiredWithoutBooksNestedInput;
}
