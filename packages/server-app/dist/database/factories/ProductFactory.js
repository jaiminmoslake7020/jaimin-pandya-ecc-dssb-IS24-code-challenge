"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getName = void 0;
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const uuid = (0, tslib_1.__importStar)(require("uuid"));
const Product_1 = require("../../models/Product");
const getName = (faker) => {
    const gender = faker.random.number(1);
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);
    return firstName + " " + lastName;
};
exports.getName = getName;
(0, typeorm_seeding_1.define)(Product_1.Product, (faker, settings) => {
    const productName = faker.commerce.productName();
    const companyName = faker.company.companyName();
    const product = new Product_1.Product();
    product.productId = uuid.v1();
    product.productName = productName;
    product.startDate = faker.date.past();
    product.productOwnerName = companyName;
    product.scrumMasterName = (0, exports.getName)(faker);
    product.methodology = Product_1.MethodologyData[faker.random.number(1)];
    const developers = [];
    const max = faker.random.number(4);
    for (let i = 0; i <= max; i++) {
        developers.push((0, exports.getName)(faker));
    }
    product.Developers = JSON.stringify(developers);
    return product;
});
//# sourceMappingURL=ProductFactory.js.map