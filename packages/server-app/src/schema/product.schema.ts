import { object, string, TypeOf, array } from "zod";

/**
 * @openapi
 * components:
 *   schema:
 *     Product:
 *       type: object
 *       required:
 *        - productName
 *        - productNumber
 *        - productOwnerName
 *        - scrumMasterName
 *        - startDate
 *        - methodology
 *        - location
 *        - Developers
 *       properties:
 *         productId:
 *           type: number
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
 *         DeveloperIds:
 *           type: array
 *           items:
 *             type: string
 */

const payload = {
  body: object({
    productName: string({
      required_error: "Product Name is required",
    }),
    productOwnerName: string({
      required_error: "Product Owner Name is required",
    }),
    scrumMasterName: string({
      required_error: "Scrum Master Name is required",
    }),
    startDate: string({
      required_error: "Start Date is required",
    }),
    methodology: string({
      required_error: "Methodology is required",
    }),
    location: string({
      required_error: "Location is required",
    }),
    Developers: array(string({
      required_error: "Developer Id is required",
    }))
  }),
};

const params = {
  params: object({
    id: string({
      required_error: "id is required",
    }),
  }),
};

export const createProductSchema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...payload,
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export const getProductSchema = object({
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type ReadProductInput = TypeOf<typeof getProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
