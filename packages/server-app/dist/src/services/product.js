"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.saveProduct = exports.getProductById = exports.getProducts = void 0;
const tslib_1 = require("tslib");
const data_source_1 = require("../data-source");
const Product_1 = require("../models/Product");
const productDeveloper_1 = require("./productDeveloper");
const getProductRepo = () => {
    return data_source_1.AppDataSource.getRepository(Product_1.Product);
};
const getProducts = (where, whereArgs) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let query = getProductRepo().createQueryBuilder('product');
    query = query.select('product.*, GROUP_CONCAT(d.id) as DevelopersString ');
    query = query.innerJoin('product_developer', 'pd', 'pd.product_id=productId');
    query = query.innerJoin('developer', 'd', 'd.id=pd.developer_id');
    query = query.where(where, whereArgs);
    query = query.groupBy("product.productId");
    const result = yield query.getRawMany();
    return result.map((d) => (Object.assign(Object.assign({}, d), { Developers: d.DevelopersString.split(',') })));
});
exports.getProducts = getProducts;
const getProductById = (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, exports.getProducts)("product.productId=:productId", { productId: id });
    if (result.length === 0 ||
        result[0].productId !== id) {
        return {
            status: 404,
            message: "Product not found."
        };
    }
    return result[0];
});
exports.getProductById = getProductById;
const saveProduct = (productInput) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { productName, productOwnerName, methodology, scrumMasterName, startDate, location, Developers } = productInput.body;
    const product = Object.assign(new Product_1.Product(), {
        productName,
        productOwnerName,
        methodology,
        scrumMasterName,
        startDate,
        location
    });
    const saveProduct = yield getProductRepo().save(product);
    const productId = saveProduct.productId;
    yield (0, productDeveloper_1.bulkInsertProductDeveloper)(Developers, productId);
    return yield (0, exports.getProductById)(productId);
});
exports.saveProduct = saveProduct;
const updateProduct = (productInput) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = productInput.params;
    const oldProduct = yield getProductRepo().findOneBy({
        productId: id
    });
    if (!oldProduct) {
        return {
            status: 404,
            message: "Product not found."
        };
    }
    const { productName, productOwnerName, methodology, scrumMasterName, startDate, location, Developers } = productInput.body;
    const product = Object.assign(oldProduct, {
        productName,
        productOwnerName,
        methodology,
        scrumMasterName,
        startDate,
        location
    });
    const saveProduct = yield getProductRepo().save(product);
    const productId = saveProduct.productId;
    yield (0, productDeveloper_1.bulkUpdateProductDeveloper)(Developers, productId);
    return yield (0, exports.getProductById)(productId);
});
exports.updateProduct = updateProduct;
const deleteProduct = (productInput) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const id = productInput.params.id;
    let productToRemove = yield getProductRepo().findOneBy({ productId: id });
    if (!productToRemove) {
        return {
            status: 404,
            message: "Product not found."
        };
    }
    yield (0, productDeveloper_1.removeByProductId)(productToRemove);
    yield getProductRepo().remove(productToRemove);
    return {
        status: 200,
        message: "Product deleted successfully"
    };
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.js.map