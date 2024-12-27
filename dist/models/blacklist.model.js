"use strict";
// import { Model, model, property } from '@loopback/repository';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blacklist = void 0;
const tslib_1 = require("tslib");
// @model({ settings: { strict: false } })
// export class Blacklist extends Model {
//   @property({
//     type: 'string',
//     id: true,
//     generated: false,
//     required: true,
//   })
//   token: string;
//   @property({
//     type: 'date',
//     required: true,
//   })
//   createdAt: string;
//   [prop: string]: any;
//   constructor(data?: Partial<Blacklist>) {
//     super(data);
//   }
//   getId() {
//     return this.token;
//   }
//   getIdObject() {
//     return { token: this.token }; 
//   }
// }
// export interface BlacklistRelations {
// }
// export type BlacklistWithRelations = Blacklist & BlacklistRelations;
const repository_1 = require("@loopback/repository");
let Blacklist = class Blacklist extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Blacklist = Blacklist;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: false,
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Blacklist.prototype, "token", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Blacklist.prototype, "createdAt", void 0);
exports.Blacklist = Blacklist = tslib_1.__decorate([
    (0, repository_1.model)({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Blacklist);
//# sourceMappingURL=blacklist.model.js.map