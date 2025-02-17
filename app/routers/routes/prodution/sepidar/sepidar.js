const router = require("express").Router();

const {
  SMSController,
} = require("../../../../http/controller/SmsSend/sms.controller");
const {
  SepidarController,
} = require("../../../../http/controller/production/SepidarSystem/sepidar.controller");

/**
 * @swagger
 * sepidar:
 *   name: Sepidar
 *   description: Sepidar
 */

/**
 * @swagger
 * /api/v1/sepidar/get-all-products:
 *  get:
 *      summary: Get Products
 *      tags: [Sepidar]
 *      description: Get Products
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
 * /api/v1/sepidar/get-all-formula:
 *  get:
 *      summary: Get Formula
 *      tags: [Sepidar]
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
 * /api/v1/sepidar/send-sms:
 *  post:
 *      summary: Send SMS
 *      tags: [Sepidar]
 *      description: Send SMS
 *      parameters:
 *      -   name: numbers
 *          type: object
 *          in: formData
 *          required: true
 *      -   name: message
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

router.get("/get-all-products", SepidarController.getAllProducts);
router.get("/get-all-formula", SepidarController.getAllFormula);

router.post("/send-sms", SMSController.sendSMS);

// router.delete("/remove", CategoryController.removeCat);
module.exports = {
  sepidarRouted: router,
};
