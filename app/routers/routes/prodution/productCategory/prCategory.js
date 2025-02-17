const {
  ProductCatController,
} = require("../../../../http/controller/production/product/category/category.controller");
const {
  SourceController,
} = require("../../../../http/controller/production/sources/source.controller");
const {
  bearerToken,
} = require("../../../../http/middleware/verifyAccessToken");

const router = require("express").Router();

/**
 * @swagger
 * ProductCategory:
 *   name: Product Category
 *   description: Product Category
 */

/**
 * @swagger
 * /api/v1/category/create:
 *  post:
 *      summary: Create productCategory
 *      tags: [ProductCategory]
 *      description: Create productCategory
 *      parameters:
 *      -   name: title
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: des
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: icon
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: slug
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: parent
 *          type: string
 *          in: formData
 *          required: false
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/category/get:
 *  get:
 *      summary: Get productCategory
 *      tags: [ProductCategory]
 *      description: Get productCategory
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/category/get-count:
 *  get:
 *      summary: Get productCategory Count
 *      tags: [ProductCategory]
 *      description: Get productCategory Count
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

router.post("/create", ProductCatController.createProductCat);

router.get("/get", ProductCatController.getAll);
router.get("/get-id", ProductCatController.getAllForUser);

router.get("/get-count", ProductCatController.getCountOfCategory);
router.delete("/delete", ProductCatController.deleteCat);

module.exports = {
  productCatRouted: router,
};
