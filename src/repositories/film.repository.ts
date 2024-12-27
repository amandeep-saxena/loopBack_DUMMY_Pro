import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { Film, FilmRelations } from '../models';

export class FilmRepository extends DefaultCrudRepository<
  Film,
  typeof Film.prototype.id,
  FilmRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Film, dataSource);
  }
}