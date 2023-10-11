import { Express, Request, Response } from "express";

function healthRoute(app: Express) {
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
    app.get("/api/health", (req: Request, res: Response) => res.sendStatus(200));
}

export default healthRoute;
