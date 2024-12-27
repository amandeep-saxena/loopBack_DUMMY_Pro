import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { Film, FilmRelations } from '../models';
export declare class FilmRepository extends DefaultCrudRepository<Film, typeof Film.prototype.id, FilmRelations> {
    constructor(dataSource: MongodbDataSource);
}
