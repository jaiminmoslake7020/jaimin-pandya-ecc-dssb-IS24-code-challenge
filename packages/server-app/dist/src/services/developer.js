"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDeveloper = exports.getDevelopers = void 0;
const tslib_1 = require("tslib");
const data_source_1 = require("../data-source");
const Developer_1 = require("../models/Developer");
const getDeveloperRepo = () => {
    return data_source_1.AppDataSource.getRepository(Developer_1.Developer);
};
const getDevelopers = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield getDeveloperRepo().find();
});
exports.getDevelopers = getDevelopers;
const saveDeveloper = (productInput) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { name, } = productInput.body;
    const product = Object.assign(new Developer_1.Developer(), {
        name,
    });
    return yield getDeveloperRepo().save(product);
});
exports.saveDeveloper = saveDeveloper;
//# sourceMappingURL=developer.js.map