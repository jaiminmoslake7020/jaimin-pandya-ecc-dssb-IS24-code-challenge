/**
 * @openapi
 * components:
 *   schema:
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *         message:
 *           type: string
 */

export type Error = {
    status: number,
    message: string
}
