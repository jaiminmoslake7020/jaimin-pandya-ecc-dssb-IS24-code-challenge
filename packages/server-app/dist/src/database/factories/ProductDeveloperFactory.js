"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("typeorm-seeding");
const ProductDeveloper_1 = require("../../models/ProductDeveloper");
(0, typeorm_seeding_1.define)(ProductDeveloper_1.ProductDeveloper, (faker, settings) => {
    return new ProductDeveloper_1.ProductDeveloper();
});
//# sourceMappingURL=ProductDeveloperFactory.js.map