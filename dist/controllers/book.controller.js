"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let BookController = class BookController {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async create(book) {
        return this.bookRepository.create(book);
    }
    async count(where) {
        return this.bookRepository.count(where);
    }
    async find() {
        return this.bookRepository.find();
    }
    async updateAll(book, where) {
        return this.bookRepository.updateAll(book, where);
    }
    async findById(id) {
        return this.bookRepository.findById(id);
    }
    async updateById(id, book) {
        await this.bookRepository.updateById(id, book);
    }
    async replaceById(id, book) {
        await this.bookRepository.replaceById(id, book);
    }
    async deleteById(id) {
        await this.bookRepository.deleteById(id);
    }
};
exports.BookController = BookController;
tslib_1.__decorate([
    (0, rest_1.post)('/books'),
    (0, rest_1.response)(200, {}),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/books/count'),
    (0, rest_1.response)(200, {}),
    tslib_1.__param(0, rest_1.param.where(models_1.Book)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/books'),
    (0, rest_1.response)(200, {}),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/books'),
    (0, rest_1.response)(200, {
    //   description: 'Book PATCH success count',
    //   content: { 'application/json': { schema: CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({})),
    tslib_1.__param(1, rest_1.param.where(models_1.Book)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Book, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/books/{id}'),
    (0, rest_1.response)(200, {}),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/books/{id}'),
    (0, rest_1.response)(204),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({})),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Book]),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/books/{id}'),
    (0, rest_1.response)(204, {
        description: 'Book PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Book]),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/books/{id}'),
    (0, rest_1.response)(204),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "deleteById", null);
exports.BookController = BookController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.BookRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BookRepository])
], BookController);
//# sourceMappingURL=book.controller.js.map