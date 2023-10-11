"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeveloperHandler = exports.listDeveloperHandler = void 0;
const tslib_1 = require("tslib");
const developer_1 = require("../services/developer");
const listDeveloperHandler = (request, response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, developer_1.getDevelopers)();
        return response.json(products);
    }
    catch (e) {
        response.statusCode = 500;
        return response.json({
            status: 500,
            message: "Failed to list developers.",
            e
        });
    }
});
exports.listDeveloperHandler = listDeveloperHandler;
const createDeveloperHandler = (request, response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        return response.json(yield (0, developer_1.saveDeveloper)(request));
    }
    catch (e) {
        response.statusCode = 500;
        return response.json({
            status: 500,
            message: "Failed to create developer.",
            e
        });
    }
});
exports.createDeveloperHandler = createDeveloperHandler;
//# sourceMappingURL=DeveloperController.js.map