"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let Product = class Product {
    toString() {
        return `${this.productName}`;
    }
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    (0, tslib_1.__metadata)("design:type", String)
], Product.prototype, "productId", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], Product.prototype, "productName", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Date)
], Product.prototype, "startDate", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({
        default: "Agile"
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Product.prototype, "methodology", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], Product.prototype, "scrumMasterName", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], Product.prototype, "Developers", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], Product.prototype, "productOwnerName", void 0);
Product = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], Product);
exports.Product = Product;
//# sourceMappingURL=Product.js.map