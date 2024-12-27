import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { Book, BookRelations } from '../models';
export declare class BookRepository extends DefaultCrudRepository<Book, typeof Book.prototype.id, BookRelations> {
    constructor(dataSource: MongodbDataSource);
}
