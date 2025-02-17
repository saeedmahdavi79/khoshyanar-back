const router = require("express").Router();

const {
  FYController,
} = require("../../../../http/controller/production/financialYear/fy.controller");

/**
 * @swagger
 * fy:
 *   name: FinancialYear
 *   description: FinancialYear
 */

/**
 * @swagger
 * /api/v1/fy/create:
 *  post:
 *      summary: Create FinancialYear
 *      tags: [FinancialYear]
 *      description: Create FinancialYear
 *      parameters:
 *      -   name: fyName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: fyDes
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: fyValue
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: activeYear
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
 * /api/v1/fy/get:
 *  get:
 *      summary: Get FinancialYear
 *      tags: [FinancialYear]
 *      description: Get FinancialYear
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
 * /api/v1/fy/remove:
 *  delete:
 *      summary: Remove FinancialYear
 *      tags: [FinancialYear]
 *      description: Remove FinancialYear
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

router.post("/create", FYController.createFy);
router.get("/get", FYController.getFy);
router.delete("/remove", FYController.deleteFy);
module.exports = {
  fyRouted: router,
};
