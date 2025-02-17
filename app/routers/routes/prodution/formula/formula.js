const {
  FormulaController,
} = require("../../../../http/controller/production/formula/formula.controller");
const {
  PishbiniController,
} = require("../../../../http/controller/production/pishbiniToolid/pishbiniTolid.controller");
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
 * Formula:
 *   name: Formula
 *   description: Formula
 */

/**
 * @swagger
 * /api/v1/formula/create:
 *  post:
 *      summary: Create Formula
 *      tags: [Formula]
 *      description: Create Formula
 *      parameters:
 *      -   name: title
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: childs
 *          type: object
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
 * /api/v1/formula/get-by-id:
 *  post:
 *      summary: Get Formula By Id
 *      tags: [Formula]
 *      description: Get Formula By Id
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
 * /api/v1/formula/get-storage-formula:
 *  post:
 *      summary: Get Formula MainCount By Id
 *      tags: [Formula]
 *      description: Get Formula MainCount By Id
 *      parameters:
 *      -   name: _id
 *          type: object
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
 * /api/v1/formula/create-toolid:
 *  post:
 *      summary: Create Toolid
 *      tags: [Formula]
 *      description: Create Toolid
 *      parameters:
 *      -   name: count
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: child
 *          type: object
 *          in: formData
 *          required: true
 *      -   name: month
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: formulaId
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
 * /api/v1/formula/get-toolid-by-month:
 *  post:
 *      summary: Get Toolid By Month
 *      tags: [Formula]
 *      description: Get Toolid By Month
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
 * /api/v1/formula/get-toolid-by-month-fr:
 *  post:
 *      summary: Get Toolid By Month And Formula
 *      tags: [Formula]
 *      description: Get Toolid By Month And Formula
 *      parameters:
 *      -   name: month
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: formulaId
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
 * /api/v1/formula/get:
 *  get:
 *      summary: Get Formula
 *      tags: [Formula]
 *      description: Get Formula
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
 * /api/v1/formula/get-in-month-pish:
 *  get:
 *      summary: Get Pishbini In Month
 *      tags: [Formula]
 *      description: Get Pishbini In Month
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
 * /api/v1/formula/get-pish-count:
 *  get:
 *      summary: Get Pishbini Count
 *      tags: [Formula]
 *      description: Get Pishbini Count
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
 * /api/v1/formula/get-formula-count:
 *  get:
 *      summary: Get Formula Count
 *      tags: [Formula]
 *      description: Get Formula Count
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
 * /api/v1/formula/get-formula-count-month:
 *  get:
 *      summary: Get Formula Count
 *      tags: [Formula]
 *      description: Get Formula Count
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

router.post("/create", FormulaController.createFormula);
router.post("/get-by-id", FormulaController.getFormulasById);
router.post(
  "/get-storage-formula",
  FormulaController.getFormulaCountFromStorage
);

router.post("/create-toolid", PishbiniController.createPishbini);
router.post("/get-toolid-by-month", PishbiniController.getPishbiniByMonth);
router.post("/get-toolid-by-month-fr", PishbiniController.getPishbiniByMonthFr);

router.get("/get", FormulaController.getAllFormulas);
router.get("/get-toolid", PishbiniController.getSPishbiniall);

router.get("/get-in-month-pish", PishbiniController.getPishbiniInMonth);
router.get("/get-pish-count", PishbiniController.getPishbiniCount);
router.get("/get-formula-count", FormulaController.getFormulaCount);
router.get("/get-formula-count-month", FormulaController.getFormulaInMonth);
router.delete("/remove", FormulaController.removeFrm);

module.exports = {
  formulaRouted: router,
};
