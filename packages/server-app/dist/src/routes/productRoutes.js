"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ProductController_1 = require("../controller/ProductController");
const validateResource_1 = tslib_1.__importDefault(require("../middleware/validateResource"));
const product_schema_1 = require("../schema/product.schema");
function productRoutes(app) {
    /**
     * @openapi
     * '/api/products/':
     *  get:
     *     tags:
     *     - Products
     *     summary: List all products
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *          application/json:
     *           schema:
     *             type: "array"
     *             items:
     *              $ref: '#/components/schema/Product'
     *       404:
     *         description: Product not found
     */
    app.get("/api/products", ProductController_1.listProductHandler);
    /**
     * @openapi
     * '/api/products/':
     *  post:
     *     tags:
     *     - Products
     *     summary: Create new product
     *     consumes:
     *     - "application/json"
     *     produces:
     *     - "application/json"
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *          application/json:
     *           schema:
     *             type: "array"
     *             items:
     *              $ref: '#/components/schema/Product'
     *       404:
     *         description: Product not found
     */
    app.post("/api/products", (0, validateResource_1.default)(product_schema_1.createProductSchema), ProductController_1.createProductHandler);
    /**
     * @openapi
     * '/api/products/{id}':
     *  put:
     *     tags:
     *     - Products
     *     summary: Update a product by the productId
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The id of the product
     *        required: true
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *          application/json:
     *           schema:
     *              $ref: '#/components/schema/Product'
     *       404:
     *         description: Product not found
     */
    app.put("/api/products/:id", (0, validateResource_1.default)(product_schema_1.updateProductSchema), ProductController_1.updateProductHandler);
    /**
     * @openapi
     * '/api/products/{id}':
     *  get:
     *     tags:
     *     - Products
     *     summary: Get a single product by the productId
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The id of the product
     *        required: true
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *          application/json:
     *           schema:
     *              $ref: '#/components/schema/Product'
     *       404:
     *         description: Product not found
     */
    app.get("/api/products/:id", (0, validateResource_1.default)(product_schema_1.getProductSchema), ProductController_1.getProductHandler);
    /**
     * @openapi
     * '/api/products/{id}':
     *  delete:
     *     tags:
     *     - Products
     *     summary: Delete a product by the productId
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The id of the product
     *        required: true
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *          application/json:
     *           schema:
     *              $ref: '#/components/schema/Success'
     *       404:
     *         description: Product not found
     */
    app.delete("/api/products/:id", (0, validateResource_1.default)(product_schema_1.deleteProductSchema), ProductController_1.deleteProductHandler);
}
exports.default = productRoutes;
//# sourceMappingURL=productRoutes.js.map