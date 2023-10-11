"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const swagger_jsdoc_1 = tslib_1.__importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = tslib_1.__importDefault(require("swagger-ui-express"));
const package_json_1 = require("../../package.json");
const logger_1 = tslib_1.__importDefault(require("./logger"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Document",
            version: package_json_1.version,
        },
    },
    host: 'localhost:3000',
    basePath: '/api',
    apis: ["./src/routes/*.ts", "./src/schema/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function swaggerDocs(app, port) {
    // Swagger page
    app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    // Docs in JSON format
    app.get("/api/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    logger_1.default.info(`Docs available at http://localhost:${port}/api/docs`);
    logger_1.default.info(`Docs available at http://localhost:${port}/api/docs.json`);
}
exports.default = swaggerDocs;
//# sourceMappingURL=swagger.js.map