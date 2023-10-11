"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDeveloper = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Developer_1 = require("./Developer");
const Product_1 = require("./Product");
let ProductDeveloper = class ProductDeveloper {
    toString() {
        return `${this.id}`;
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], ProductDeveloper.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({
        name: 'product_id',
        nullable: false,
    }),
    tslib_1.__metadata("design:type", String)
], ProductDeveloper.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Product_1.Product, product => product.Developers),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    tslib_1.__metadata("design:type", Product_1.Product)
], ProductDeveloper.prototype, "product", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({
        name: 'developer_id',
        nullable: false,
    }),
    tslib_1.__metadata("design:type", String)
], ProductDeveloper.prototype, "developerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Developer_1.Developer, developerItem => developerItem.Products),
    (0, typeorm_1.JoinColumn)({ name: 'developer_id' }),
    tslib_1.__metadata("design:type", Developer_1.Developer)
], ProductDeveloper.prototype, "developerItem", void 0);
ProductDeveloper = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], ProductDeveloper);
exports.ProductDeveloper = ProductDeveloper;
//# sourceMappingURL=ProductDeveloper.js.map