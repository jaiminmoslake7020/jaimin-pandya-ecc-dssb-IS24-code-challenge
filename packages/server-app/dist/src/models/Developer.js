"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Developer = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const ProductDeveloper_1 = require("./ProductDeveloper");
let Developer = class Developer {
    toString() {
        return `${this.name}`;
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Developer.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Developer.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => ProductDeveloper_1.ProductDeveloper, productDeveloper => productDeveloper.developerItem),
    tslib_1.__metadata("design:type", Array)
], Developer.prototype, "Products", void 0);
Developer = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Developer);
exports.Developer = Developer;
//# sourceMappingURL=Developer.js.map