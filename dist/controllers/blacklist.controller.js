"use strict";
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlacklistController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const blacklist_repository_1 = require("../repositories/blacklist.repository");
// import {inject} from '@loopback/core';
let BlacklistController = class BlacklistController {
    constructor(blacklistRepository) {
        this.blacklistRepository = blacklistRepository;
    }
};
exports.BlacklistController = BlacklistController;
exports.BlacklistController = BlacklistController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(blacklist_repository_1.BlacklistRepository)),
    tslib_1.__metadata("design:paramtypes", [blacklist_repository_1.BlacklistRepository])
], BlacklistController);
//# sourceMappingURL=blacklist.controller.js.map