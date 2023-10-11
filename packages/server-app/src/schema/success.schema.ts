/**
 * @openapi
 * components:
 *   schema:
 *     Success:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *         message:
 *           type: string
 */

export type Success = {
    status: number,
    message: string
}
