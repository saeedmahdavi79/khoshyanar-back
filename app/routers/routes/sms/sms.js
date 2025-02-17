const router = require("express").Router();

const {
  RoleController,
} = require("../../../http/controller/Role/role.controller");
const {
  SMSController,
} = require("../../../http/controller/SmsSend/sms.controller");
const { bearerToken } = require("../../../http/middleware/verifyAccessToken");

/**
 * @swagger
 * sms:
 *   name: SMS
 *   description: SMS
 */

/**
 * @swagger
 * /api/v1/sms/create:
 *  post:
 *      summary: Create SMS
 *      tags: [SMS]
 *      description: Create SMS
 *      parameters:
 *      -   name: roleName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: access
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: des
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
 * /api/v1/sms/get:
 *  get:
 *      summary: Get SMS
 *      tags: [SMS]
 *      description: Get SMS
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
 * /api/v1/sms/remove:
 *  delete:
 *      summary: Remove SMS
 *      tags: [SMS]
 *      description: Remove SMS
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

router.post("/create", bearerToken, SMSController.sendSMS);
router.get("/get", bearerToken, SMSController.getSms);
// router.delete("/remove", bearerToken, RoleController.removeRole);
module.exports = {
  smsRouted: router,
};
