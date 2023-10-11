"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Product_1 = require("../../models/Product");
class CreateProducts {
    // @ts-ignore
    run(factory, connection) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield factory(Product_1.Product)().seedMany(10);
        });
    }
}
exports.default = CreateProducts;
//# sourceMappingURL=CreateProducts.js.map