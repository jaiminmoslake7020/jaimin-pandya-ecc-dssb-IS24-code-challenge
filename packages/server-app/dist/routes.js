"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const ProductController_1 = require("./controller/ProductController");
exports.Routes = [{
        method: "get",
        route: "/api/products",
        controller: ProductController_1.ProductController,
        action: "all"
    }, {
        method: "get",
        route: "/api/products/:id",
        controller: ProductController_1.ProductController,
        action: "one"
    }, {
        method: "post",
        route: "/api/products",
        controller: ProductController_1.ProductController,
        action: "save"
    }, {
        method: "put",
        route: "/api/products/:id",
        controller: ProductController_1.ProductController,
        action: "update"
    }, {
        method: "delete",
        route: "/api/products/:id",
        controller: ProductController_1.ProductController,
        action: "remove"
    }];
//# sourceMappingURL=routes.js.map