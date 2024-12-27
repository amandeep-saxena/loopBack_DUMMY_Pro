"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongodbDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
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
let MongodbDataSource = class MongodbDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
exports.MongodbDataSource = MongodbDataSource;
MongodbDataSource.dataSourceName = 'mongodb';
MongodbDataSource.defaultConfig = config;
exports.MongodbDataSource = MongodbDataSource = tslib_1.__decorate([
    (0, core_1.lifeCycleObserver)('datasource'),
    tslib_1.__param(0, (0, core_1.inject)('datasources.config.mongodb', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], MongodbDataSource);
//# sourceMappingURL=mongodb.datasource.js.map