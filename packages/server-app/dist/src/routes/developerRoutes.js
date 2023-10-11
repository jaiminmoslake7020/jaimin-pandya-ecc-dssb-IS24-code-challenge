"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const validateResource_1 = tslib_1.__importDefault(require("../middleware/validateResource"));
const DeveloperController_1 = require("../controller/DeveloperController");
const developer_schema_1 = require("../schema/developer.schema");
function developerRoutes(app) {
    /**
     * @openapi
     * '/api/developers':
     *   get:
     *     tags:
     *     - Developers
     *     summary: List all developers
     *     responses:
     *       '200':
     *         description: Success
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schema/Developer'
     *       '404':
     *         description: Developers not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schema/Error'
     *       '500':
     *         description: Internal Error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schema/Error'
     */
    app.get("/api/developers", DeveloperController_1.listDeveloperHandler);
    /**
     * @openapi
     * '/api/developers':
     *   post:
     *     tags:
     *       - Developers
     *     summary: Create new developer
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: body
     *         description: Developer Info
     *         required: true
     *         schema:
     *           $ref: '#/components/schema/Developer'
     *     responses:
     *       '200':
     *         description: Success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schema/Developer'
     *       '404':
     *         description: Developers not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schema/Error'
     *       '500':
     *         description: Internal Error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schema/Error'
     */
    app.post("/api/developers", (0, validateResource_1.default)(developer_schema_1.createDeveloperSchema), DeveloperController_1.createDeveloperHandler);
}
exports.default = developerRoutes;
//# sourceMappingURL=developerRoutes.js.map