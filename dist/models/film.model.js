"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Film = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Film = class Film extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Film = Film;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: false,
    }),
    tslib_1.__metadata("design:type", String)
], Film.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Film.prototype, "title", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Film.prototype, "description", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Film.prototype, "category", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Film.prototype, "rating", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Film.prototype, "actors", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], Film.prototype, "file", void 0);
exports.Film = Film = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Film);
//# sourceMappingURL=film.model.js.map