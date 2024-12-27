import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { Blacklist, BlacklistRelations } from '../models';
export declare class BlacklistRepository extends DefaultCrudRepository<Blacklist, typeof Blacklist.prototype.token, BlacklistRelations> {
    constructor(dataSource: MongodbDataSource);
}
