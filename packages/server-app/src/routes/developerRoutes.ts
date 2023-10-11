import { Express } from "express";
import validateResource from "../middleware/validateResource";
import {createDeveloperHandler, listDeveloperHandler} from '../controller/DeveloperController';
import {createDeveloperSchema} from '../schema/developer.schema';

function developerRoutes(app: Express) {

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
    app.get(
        "/api/developers",
        listDeveloperHandler
    );


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
    app.post(
        "/api/developers",
        validateResource(createDeveloperSchema),
        createDeveloperHandler
    );
}

export default developerRoutes;
