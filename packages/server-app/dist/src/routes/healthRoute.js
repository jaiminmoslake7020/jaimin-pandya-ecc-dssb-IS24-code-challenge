"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function healthRoute(app) {
    /**
     * @openapi
     * /api/health:
     *  get:
     *     tags:
     *     - Healthcheck
     *     description: Responds if the app is up and running
     *     responses:
     *       200:
     *         description: App is up and running
     */
    app.get("/api/health", (req, res) => res.sendStatus(200));
}
exports.default = healthRoute;
//# sourceMappingURL=healthRoute.js.map