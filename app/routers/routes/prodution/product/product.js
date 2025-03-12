const {
  ProductCatController,
} = require("../../../../http/controller/production/product/category/category.controller");
const {
  ProductController,
} = require("../../../../http/controller/production/product/product.controller");
const {
  ProductReportController,
} = require("../../../../http/controller/production/product/report/report.controller");
const {
  SourceController,
} = require("../../../../http/controller/production/sources/source.controller");
const {
  bearerToken,
} = require("../../../../http/middleware/verifyAccessToken");

const router = require("express").Router();

/**
 * @swagger
 * Product:
 *   name: Product
 *   description: Product
 */

/**
 * @swagger
 * /api/v1/product/create:
 *  post:
 *      summary: Create Product
 *      tags: [Product]
 *      description: Create Product
 *      parameters:
 *      -   name: title
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: des
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: formulaId
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: formulaName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: machineCount
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: productCatId
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: productCatName
 *          type: string
 *          in: formData
 *          required: false
 *      -   name: erpCount
 *          type: string
 *          in: formData
 *          required: false
 *      -   name: vahed
 *          type: string
 *          in: formData
 *          required: false
 *      -   name: vahed2
 *          type: string
 *          in: formData
 *          required: false
 *      -   name: firstCount
 *          type: string
 *          in: formData
 *          required: false
 *      -   name: entryCount
 *          type: string
 *          in: formData
 *          required: false
 *      -   name: exportCount
 *          type: string
 *          in: formData
 *          required: false
 *      -   name: sourceId
 *          type: string
 *          in: formData
 *          required: false
 *      -   name: sourceName
 *          type: string
 *          in: formData
 *          required: false
 *      -   name: status
 *          type: string
 *          in: formData
 *          required: false
 *      -   name: slug
 *          type: string
 *          in: formData
 *          required: false
 *      -   name: code
 *          type: string
 *          in: formData
 *          required: false
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
 * /api/v1/product/get-count-by-id:
 *  post:
 *      summary: Product Count By Cat
 *      tags: [Product]
 *      description: Product Count By Cat
 *      parameters:
 *      -   name: _id
 *          type: string
 *          in: formData
 *          required: true
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
 * /api/v1/product/get-by-month:
 *  post:
 *      summary: Product By Month
 *      tags: [Product]
 *      description: Product By Month
 *      parameters:
 *      -   name: month
 *          type: string
 *          in: formData
 *          required: true
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
 * /api/v1/product/get-by-year:
 *  post:
 *      summary: Product By Year
 *      tags: [Product]
 *      description: Product By Year
 *      parameters:
 *      -   name: year
 *          type: string
 *          in: formData
 *          required: true
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
 * /api/v1/product/get-by-year-month:
 *  post:
 *      summary: Product Cat By Year And Month
 *      tags: [Product]
 *      description: Product Cat By Year And Month
 *      parameters:
 *      -   name: year
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: month
 *          type: string
 *          in: formData
 *          required: true
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
 * /api/v1/product/get-pr-by-year-month:
 *  post:
 *      summary: Product By Year And Month
 *      tags: [Product]
 *      description: Product By Year And Month
 *      parameters:
 *      -   name: year
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: month
 *          type: string
 *          in: formData
 *          required: true
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
 * /api/v1/product/get-src-by-year-month:
 *  post:
 *      summary: Product By Year And Month
 *      tags: [Product]
 *      description: Product By Year And Month
 *      parameters:
 *      -   name: year
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: month
 *          type: string
 *          in: formData
 *          required: true
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
 * /api/v1/product/add-child-parent:
 *  post:
 *      summary: Add Child To Parent
 *      tags: [Product]
 *      description: Add Child To Parent
 *      parameters:
 *      -   name: child
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: parent
 *          type: string
 *          in: formData
 *          required: true
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
 * /api/v1/product/get-cat-in-month:
 *  get:
 *      summary: Get productCategory in month
 *      tags: [Product]
 *      description: Get productCategory in month
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
 * /api/v1/product/get-product-in-month:
 *  get:
 *      summary: Get Product in month
 *      tags: [Product]
 *      description: Get Product in month
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
 * /api/v1/product/get:
 *  get:
 *      summary: Get product
 *      tags: [Product]
 *      description: Get product
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
 * /api/v1/product/get-count:
 *  get:
 *      summary: Get Product Count
 *      tags: [Product]
 *      description: Get Product Count
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
 * /api/v1/product/get-count-of-category:
 *  get:
 *      summary: Get Product Category Count
 *      tags: [Product]
 *      description: Get Product Category Count
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
 * /api/v1/product/get-count-of-category-by-month:
 *  get:
 *      summary: Get Product Category Count By Month
 *      tags: [Product]
 *      description: Get Product Category Count By Month
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
 * /api/v1/product/get-source-in-month:
 *  get:
 *      summary: Get Product Source Count By Month
 *      tags: [Product]
 *      description: Get Product Source Count By Month
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
 * /api/v1/product/get-source-count:
 *  get:
 *      summary: Get Product Source Count
 *      tags: [Product]
 *      description: Get Product Source Count
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
 * /api/v1/product/get-product-id:
 *  get:
 *      summary: Get Product By Id
 *      tags: [Product]
 *      description: Get Product By Id
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

router.post("/create", ProductController.createProduct);
router.post(
  "/get-count-by-id",
  ProductReportController.getCountOfProductByCategoryId
);
router.post("/get-prd-by-src", ProductController.getProductySRC);
router.post("/add-child-parent", ProductController.addChildToParent);
router.get("/get", ProductController.getAll);
router.get("/get-count", ProductReportController.getCountOfProducts);
router.get("/get-per-count", ProductReportController.getCountOfPersonel);

router.get(
  "/get-count-of-category",
  ProductReportController.getCountOfCategory
);
router.get("/get-cat-in-month", ProductReportController.getCategoryInMonth);
router.get("/get-product-in-month", ProductReportController.getProductInMonth);
router.get("/get-source-in-month", ProductReportController.getSourcesInMonth);
router.get("/get-source-count", ProductReportController.getCountOfSource);
router.get("/get-product-id", ProductController.getAllForUser);
router.get("/get-resid-anbar", ProductController.incraseMojodiGet);
router.get("/get-havale-anbar", ProductController.decraseMojodiGet);

router.post(
  "/get-count-of-category-by-month",
  ProductReportController.getCategoryByMonth
);

router.post(
  "/admin-resid-confirm",
  ProductController.incraseMojodiAdminConfirm
);
router.post(
  "/admin-havale-confirm",
  ProductController.decraseMojodiAdminConfirm
);

router.post(
  "/anbar-havale-confirm",
  ProductController.decraseMojodiAnbarConfirm
);

router.post("/sarparast-confirm", ProductController.orderOpConfirm);
router.post("/manage-confirm", ProductController.orderOpManageConfirm);
router.post("/anbar-confirm", ProductController.orderOpManageConfirmAnbardar);

router.post("/get-by-month", ProductReportController.getCategoryByMonth);
router.post("/get-by-year", ProductReportController.getCategoryByYear);
router.post(
  "/get-by-year-month",
  ProductReportController.getCategoryByYearAndMonth
);
router.post(
  "/get-pr-by-year-month",
  ProductReportController.getProductByYearAndMonth
);
router.post(
  "/get-src-by-year-month",
  ProductReportController.getSourceByYearAndMonth
);
router.put("/edit", ProductController.editProduct);
router.put("/incrase", ProductController.incraseMojodi);
router.put("/incrase-batch", ProductController.incraseMojodiList);
router.put("/decrase-batch", ProductController.decraseMojodiList);
router.put("/edit-order", ProductController.editHavaleOrder);

router.put("/decrase", ProductController.decraseMojodi);

router.delete("/remove", ProductController.deleteProduct);

module.exports = {
  productRouted: router,
};
