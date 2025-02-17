const router = require("express").Router();

const {
  LeadController,
} = require("../../../http/controller/Lead/Lead.controller");
const {
  calenderController,
} = require("../../../http/controller/calender/calender.controller");
const {
  bearerToken,
  bearerTokenVisitor,
} = require("../../../http/middleware/verifyAccessToken");

/**
 * @swagger
 * calender:
 *   name: Calender
 *   description: Calender
 */

/**
 * @swagger
 * /api/v1/calender/create:
 *  post:
 *      summary: Create Calender
 *      tags: [Calender]
 *      description: Create Calender
 *      parameters:
 *      -   name: color
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: end
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: start
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: title
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
 * /api/v1/leads/get-lead-by-id:
 *  post:
 *      summary: Get Lead By Id
 *      tags: [Leads]
 *      description: Get Lead By Id
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
 * /api/v1/leads/get-lead-by-id-admin:
 *  post:
 *      summary: Get Lead By Id Admin
 *      tags: [Calender]
 *      description: Get Lead By Id Admin
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
 * /api/v1/leads/getAll:
 *  get:
 *      summary: Get Leads
 *      tags: [Calender]
 *      description: Get Leads
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
 * /api/v1/leads/get-visitor-leads:
 *  get:
 *      summary: Get Leads
 *      tags: [Calender]
 *      description: Get Leads
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
 * /api/v1/calender/get-admin-event:
 *  get:
 *      summary: Get Admin Calender
 *      tags: [Calender]
 *      description: Get Admin Calender
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

// /**
//  * @swagger
//  * /api/v1/leads/remove:
//  *  delete:
//  *      summary: Leads Remove
//  *      tags: [Calender]
//  *      description: Leads Remove
//  *      parameters:
//  *      -   name: _id
//  *          type: string
//  *          in: formData
//  *          required: true
//  *      responses:
//  *          200:
//  *              description: Success
//  *          404:
//  *              description: Not Found
//  *          500:
//  *              description: Internal Server Error
//  */

router.post("/create", bearerToken, calenderController.createEvent);
router.post("/get-lead-by-id", bearerTokenVisitor, LeadController.getLeadById);
router.post("/get-lead-by-id-admin", bearerToken, LeadController.getLeadById);

router.get("/getAll", LeadController.getAllLeads);
router.get(
  "/get-visitor-leads",
  bearerTokenVisitor,
  LeadController.getAllLeadsOfVisitor
);
router.get("/get-admin-event", bearerToken, calenderController.getEvent);

// router.delete("/remove", CategoryController.removeCat);
module.exports = {
  calenderRouted: router,
};
