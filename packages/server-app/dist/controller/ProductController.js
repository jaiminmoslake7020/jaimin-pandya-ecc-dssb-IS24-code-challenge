"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const tslib_1 = require("tslib");
const data_source_1 = require("../data-source");
const Product_1 = require("../models/Product");
class ProductController {
    constructor() {
        this.productRepository = data_source_1.AppDataSource.getRepository(Product_1.Product);
    }
    all(request, response, next) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.productRepository.find();
        });
    }
    one(request, response, next) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const id = request.params.id;
            const product = yield this.productRepository.findOne({
                where: { productId: id }
            });
            if (!product) {
                return "product not found";
            }
            return product;
        });
    }
    save(request, response, next) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { firstName, lastName, age } = request.body;
            const product = Object.assign(new Product_1.Product(), {
                firstName,
                lastName,
                age
            });
            return this.productRepository.save(product);
        });
    }
    update(request, response, next) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const id = request.params.id;
            let product = yield this.productRepository.findOne({
                where: { productId: id }
            });
            if (!product) {
                return "product not found";
            }
            const { firstName, lastName, age } = request.body;
            product = Object.assign(new Product_1.Product(), {
                firstName,
                lastName,
                age
            });
            return this.productRepository.save(product);
        });
    }
    remove(request, response, next) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const id = request.params.id;
            let productToRemove = yield this.productRepository.findOneBy({ productId: id });
            if (!productToRemove) {
                return "product not found";
            }
            yield this.productRepository.remove(productToRemove);
            return "product has been removed";
        });
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map