const router = require("express").Router();

const {
  PlanController,
} = require("../../../http/controller/Plans/plan.controller");
const {
  bearerToken,
  bearerTokenVisitor,
} = require("../../../http/middleware/verifyAccessToken");

/**
 * @swagger
 * plans:
 *   name: Plans
 *   description: Plans
 */

/**
 * @swagger
 * /api/v1/plans/create:
 *  post:
 *      summary: Create Plans
 *      tags: [Plans]
 *      description: Create Plans
 *      parameters:
 *      -   name: planName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: planDetails
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: planPrice
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: planStatus
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: planDiscount
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: planLenght
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: planProfit
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
 * /api/v1/plans/create-order:
 *  post:
 *      summary: Create Order
 *      tags: [Plans]
 *      description: Create Order
 *      parameters:
 *      -   name: orderPrice
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: orderPayMethod
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: orderDes
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
 * /api/v1/plans/pay-order:
 *  post:
 *      summary: Pay Order
 *      tags: [Plans]
 *      description: Pay Order
 *      parameters:
 *      -   name: orderId
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
 * /api/v1/plans/pay-verify:
 *  post:
 *      summary: Verify Order
 *      tags: [Plans]
 *      description: Verify Order
 *      parameters:
 *      -   name: trackId
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
 * /api/v1/plans/add-plan-to-user:
 *  post:
 *      summary: Add Order
 *      tags: [Plans]
 *      description: Add Order
 *      parameters:
 *      -   name: userId
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: planId
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
 * /api/v1/plans/get:
 *  get:
 *      summary: Get Plans
 *      tags: [Plans]
 *      description: Get Plans
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

router.post("/create", PlanController.createPlan);
router.post("/create-order", PlanController.createOrder);
router.post("/pay-order", PlanController.payOrder);
router.post("/pay-verify", PlanController.orderVerify);
router.post("/add-plan-to-user", PlanController.addPlanToUser);

router.get("/get", PlanController.getAllPlans);

module.exports = {
  plansRouted: router,
};
