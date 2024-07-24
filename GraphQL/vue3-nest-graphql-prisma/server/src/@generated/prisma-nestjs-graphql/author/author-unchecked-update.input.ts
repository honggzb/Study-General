import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { BookUncheckedUpdateManyWithoutAuthorNestedInput } from '../book/book-unchecked-update-many-without-author-nested.input';

@InputType()
export class AuthorUncheckedUpdateInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    gender?: IntFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: StringFieldUpdateOperationsInput;

    @Field(() => BookUncheckedUpdateManyWithoutAuthorNestedInput, {nullable:true})
    books?: BookUncheckedUpdateManyWithoutAuthorNestedInput;
}
