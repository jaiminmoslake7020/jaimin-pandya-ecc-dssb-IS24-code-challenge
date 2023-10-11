import { object, string, TypeOf } from "zod";

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
  body: object({
    name: string({
      required_error: "Developer Name is required",
    }),
  }),
};

export const createDeveloperSchema = object({
  ...payload,
});

export type CreateDeveloperInput = TypeOf<typeof createDeveloperSchema>;
