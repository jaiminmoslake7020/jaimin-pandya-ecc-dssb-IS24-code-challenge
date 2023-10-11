import { Express } from "express";
import {
    createProductHandler,
    getProductHandler,
    updateProductHandler,
    deleteProductHandler,
    listProductHandler
} from "../controller/ProductController";
import validateResource from "../middleware/validateResource";
import {
    createProductSchema,
    deleteProductSchema,
    getProductSchema,
    updateProductSchema,
} from "../schema/product.schema";

function productRoutes(app: Express) {

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
    app.get(
        "/api/products",
        listProductHandler
    );

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
    app.post(
        "/api/products",
        validateResource(createProductSchema),
        createProductHandler
    );

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
    app.put(
        "/api/products/:id",
        validateResource(updateProductSchema),
        updateProductHandler
    );

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
    app.get(
        "/api/products/:id",
        validateResource(getProductSchema),
        getProductHandler
    );

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
    app.delete(
        "/api/products/:id",
        validateResource(deleteProductSchema),
        deleteProductHandler
    );
}

export default productRoutes;
