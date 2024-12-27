import { Count, Where } from '@loopback/repository';
import { Book } from '../models';
import { BookRepository } from '../repositories';
export declare class BookController {
    bookRepository: BookRepository;
    constructor(bookRepository: BookRepository);
    create(book: any): Promise<Book>;
    count(where?: Where<Book>): Promise<Count>;
    find(): Promise<Book[]>;
    updateAll(book: Book, where?: Where<Book>): Promise<Count>;
    findById(id: string): Promise<Book>;
    updateById(id: string, book: Book): Promise<void>;
    replaceById(id: string, book: Book): Promise<void>;
    deleteById(id: string): Promise<void>;
}
