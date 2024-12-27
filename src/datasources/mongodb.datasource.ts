import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';

// const config = {
//   name: 'mongodb',
//   connector: 'mongodb',
//   url: 'mongodb+srv://saxenaman903:7iBj7Pkhtfj2bMGl@cluster0.j2jkj8p.mongodb.net/',
//   host: 'localhost',
//   port: 27017,
//   user: 'myUser',
//   password: 'myPassword',
//   database: 'books',
//   useNewUrlParser: true
// };


const config = {
  name: 'mongodb',
  connector: 'mongodb', 
  url: 'mongodb://localhost:27017',
  database: 'books',
  useNewUrlParser: true,
};


@lifeCycleObserver('datasource')
export class MongodbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongodb', { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
