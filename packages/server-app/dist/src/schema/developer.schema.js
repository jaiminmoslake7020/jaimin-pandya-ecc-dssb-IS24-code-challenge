"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeveloperSchema = void 0;
const zod_1 = require("zod");
/**
 * @openapi
 * components:
 *   schema:
 *     Developer:
 *       type: object
 *       required:
 *        - name
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 */
const payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Developer Name is required",
        }),
    }),
};
exports.createDeveloperSchema = (0, zod_1.object)(Object.assign({}, payload));
//# sourceMappingURL=developer.schema.js.map