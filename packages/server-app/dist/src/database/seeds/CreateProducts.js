"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const Product_1 = require("../../models/Product");
const Developer_1 = require("../../models/Developer");
const ProductDeveloper_1 = require("../../models/ProductDeveloper");
const faker = tslib_1.__importStar(require("faker"));
class CreateProducts {
    // @ts-ignore
    run(factory, connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log('CreateProducts');
            // await factory(Product)().seedMany(10);
            const totalNumOfDevelopers = 100;
            const developerList = [];
            yield (0, typeorm_seeding_1.times)(totalNumOfDevelopers, (n) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const developer = yield factory(Developer_1.Developer)().create();
                developerList.push(developer);
            }));
            const em = connection.createEntityManager();
            yield (0, typeorm_seeding_1.times)(40, (n) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const product = yield factory(Product_1.Product)().create();
                const numOfDevelopers = faker.random.number(4);
                yield (0, typeorm_seeding_1.times)(numOfDevelopers + 1, (n) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const currentDeveloper = faker.random.number(totalNumOfDevelopers - 1);
                    const productDeveloper = yield factory(ProductDeveloper_1.ProductDeveloper)().make();
                    productDeveloper.product = product;
                    productDeveloper.developerItem = developerList[currentDeveloper];
                    yield em.save(productDeveloper);
                }));
                return product;
            }));
        });
    }
}
exports.default = CreateProducts;
//# sourceMappingURL=CreateProducts.js.map