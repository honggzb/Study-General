import { registerEnumType } from '@nestjs/graphql';

export enum AuthorScalarFieldEnum {
    id = "id",
    name = "name",
    gender = "gender",
    email = "email"
}


registerEnumType(AuthorScalarFieldEnum, { name: 'AuthorScalarFieldEnum', description: undefined })
