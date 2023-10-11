"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getName = void 0;
const typeorm_seeding_1 = require("typeorm-seeding");
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
    product.productName = productName;
    product.startDate = faker.date.past();
    product.productOwnerName = companyName;
    product.scrumMasterName = (0, exports.getName)(faker);
    product.methodology = Product_1.MethodologyData[faker.random.number(1)];
    const url = faker.lorem.word();
    product.location = "https://github.com/bcgov/" + url;
    return product;
});
//# sourceMappingURL=ProductFactory.js.map