"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeByProductId = exports.bulkUpdateProductDeveloper = exports.bulkInsertProductDeveloper = exports.getProductDevelopersByProductId = void 0;
const tslib_1 = require("tslib");
const data_source_1 = require("../data-source");
const ProductDeveloper_1 = require("../models/ProductDeveloper");
const getProductDeveloperRepo = () => {
    return data_source_1.AppDataSource.getRepository(ProductDeveloper_1.ProductDeveloper);
};
const getProductDevelopersByProductId = (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let query = getProductDeveloperRepo().createQueryBuilder('pd');
    query = query.select('GROUP_CONCAT(pd.developer_id) as developerIdList');
    query = query.where("pd.productId=:productId", { productId: id });
    query = query.groupBy("pd.productId");
    return yield query.getRawOne();
});
exports.getProductDevelopersByProductId = getProductDevelopersByProductId;
function bulkInsertProductDeveloper(Developers, productId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const newProductDevelopers = [];
        Developers.map((s) => {
            const pdObj = Object.assign(new ProductDeveloper_1.ProductDeveloper(), {
                productId,
                developerId: s
            });
            newProductDevelopers.push(pdObj);
        });
        const pdRepo = getProductDeveloperRepo();
        yield pdRepo.createQueryBuilder().insert().values(newProductDevelopers).execute();
    });
}
exports.bulkInsertProductDeveloper = bulkInsertProductDeveloper;
function bulkUpdateProductDeveloper(Developers, productId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const developerExists = yield (0, exports.getProductDevelopersByProductId)(productId);
        const { developerIdList } = developerExists || {};
        const developerIdsArray = (developerIdList || '').split(',');
        const newProductDevelopers = [];
        Developers.map((s) => {
            if (!developerIdsArray.includes(s)) {
                const pdObj = Object.assign(new ProductDeveloper_1.ProductDeveloper(), {
                    productId,
                    developerId: s
                });
                newProductDevelopers.push(pdObj);
            }
        });
        const pdRepo = getProductDeveloperRepo();
        yield pdRepo.createQueryBuilder().insert().values(newProductDevelopers).execute();
    });
}
exports.bulkUpdateProductDeveloper = bulkUpdateProductDeveloper;
const removeByProductId = (productToRemove) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let deleteResult = yield getProductDeveloperRepo().delete({
        productId: productToRemove.productId
    });
    console.log(`Deleted ${deleteResult.affected} product developers`);
    return {
        status: 200,
        message: "Product Developers deleted successfully"
    };
});
exports.removeByProductId = removeByProductId;
//# sourceMappingURL=productDeveloper.js.map