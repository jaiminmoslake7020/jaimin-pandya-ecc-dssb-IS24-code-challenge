"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Product_1 = require("./models/Product");
const Developer_1 = require("./models/Developer");
const ProductDeveloper_1 = require("./models/ProductDeveloper");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "./server.sqlite",
    synchronize: true,
    logging: false,
    entities: [Product_1.Product, Developer_1.Developer, ProductDeveloper_1.ProductDeveloper],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source-cli.js.map