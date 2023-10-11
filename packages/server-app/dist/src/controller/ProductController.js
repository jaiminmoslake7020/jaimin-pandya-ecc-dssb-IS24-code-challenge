"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductHandler = exports.updateProductHandler = exports.createProductHandler = exports.getProductHandler = exports.listProductHandler = void 0;
const tslib_1 = require("tslib");
const product_1 = require("../services/product");
const listProductHandler = (request, response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, product_1.getProducts)("1", {});
        return response.json(products);
    }
    catch (e) {
        response.statusCode = 500;
        return response.json({
            status: 500,
            message: "Failed to list products."
        });
    }
});
exports.listProductHandler = listProductHandler;
const getProductHandler = (request, response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        return response.json(yield (0, product_1.getProductById)(id));
    }
    catch (e) {
        response.statusCode = 500;
        return response.json({
            status: 500,
            message: "Failed to get product."
        });
    }
});
exports.getProductHandler = getProductHandler;
const createProductHandler = (request, response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        return response.json(yield (0, product_1.saveProduct)(request));
    }
    catch (e) {
        response.statusCode = 500;
        return response.json({
            status: 500,
            message: "Failed to create product."
        });
    }
});
exports.createProductHandler = createProductHandler;
const updateProductHandler = (request, response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        return response.json(yield (0, product_1.updateProduct)(request));
    }
    catch (e) {
        response.statusCode = 500;
        return response.json({
            status: 500,
            message: "Failed to update product."
        });
    }
});
exports.updateProductHandler = updateProductHandler;
const deleteProductHandler = (request, response) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, product_1.deleteProduct)(request);
        return response.json(products);
    }
    catch (e) {
        console.log('e', e);
        response.statusCode = 500;
        return response.json({
            status: 500,
            message: "Failed to delete product."
        });
    }
});
exports.deleteProductHandler = deleteProductHandler;
//# sourceMappingURL=ProductController.js.map