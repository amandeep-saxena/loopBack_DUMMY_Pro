import { Entity } from '@loopback/repository';
export declare class Book extends Entity {
    id?: string;
    title: string;
    authors: string;
    [prop: string]: any;
    constructor(data?: Partial<Book>);
}
export interface BookRelations {
}
export type BookWithRelations = Book & BookRelations;
