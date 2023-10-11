"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductSchema = exports.deleteProductSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
/**
 * @openapi
 * components:
 *   schema:
 *     Product:
 *       type: object
 *       required:
 *        - productName
 *        - productOwnerName
 *        - scrumMasterName
 *        - startDate
 *        - methodology
 *        - location
 *        - Developers
 *       properties:
 *         productId:
 *           type: string
 *         productName:
 *           type: string
 *         productOwnerName:
 *           type: string
 *         scrumMasterName:
 *           type: string
 *         startDate:
 *           type: date
 *         methodology:
 *           type: string
 *         location:
 *           type: string
 *         Developers:
 *           type: array
 *           items:
 *             type: string
 */
const payload = {
    body: (0, zod_1.object)({
        productName: (0, zod_1.string)({
            required_error: "Product Name is required",
        }),
        productOwnerName: (0, zod_1.string)({
            required_error: "Product Owner Name is required",
        }),
        scrumMasterName: (0, zod_1.string)({
            required_error: "Scrum Master Name is required",
        }),
        startDate: (0, zod_1.string)({
            required_error: "Start Date is required",
        }),
        methodology: (0, zod_1.string)({
            required_error: "Methodology is required",
        }),
        location: (0, zod_1.string)({
            required_error: "Location is required",
        }),
        Developers: (0, zod_1.array)((0, zod_1.string)({
            required_error: "Developer Id is required",
        }))
    }),
};
const params = {
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: "id is required",
        }),
    }),
};
exports.createProductSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateProductSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteProductSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getProductSchema = (0, zod_1.object)(Object.assign({}, params));
//# sourceMappingURL=product.schema.js.map