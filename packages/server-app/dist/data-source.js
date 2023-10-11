"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Product_1 = require("./models/Product");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "/Users/Jaimin/Sites/bc-gov/Jaimin-Pandya-ecc-dssb-IS21-code-challenge-req101408/packages/server-app/server.sqlite",
    synchronize: true,
    logging: false,
    entities: [Product_1.Product],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map