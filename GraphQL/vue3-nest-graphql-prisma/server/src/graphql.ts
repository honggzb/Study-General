
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateBookInput {
    name: string;
    type?: Nullable<string>;
    authorId: string;
}

export class CreateAuthorInput {
    name: string;
    gender: number;
    email: string;
}

export abstract class IQuery {
    abstract books(): Nullable<Book>[] | Promise<Nullable<Book>[]>;

    abstract authors(): Nullable<Author>[] | Promise<Nullable<Author>[]>;
}

export abstract class IMutation {
    abstract createAuthor(createAuthorInput: CreateAuthorInput): Author | Promise<Author>;

    abstract createBook(createBookInput: CreateBookInput): Book | Promise<Book>;
}

export class Book {
    id: string;
    name: string;
    type?: Nullable<string>;
    author: Author;
}

export class Author {
    id: string;
    name: string;
    gender: number;
    email: string;
    books?: Nullable<Book[]>;
}

type Nullable<T> = T | null;
