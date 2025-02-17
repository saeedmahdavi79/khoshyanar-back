const router = require("express").Router();

const {
  LeadController,
} = require("../../../http/controller/Lead/Lead.controller");
const {
  bearerToken,
  bearerTokenVisitor,
} = require("../../../http/middleware/verifyAccessToken");

/**
 * @swagger
 * leads:
 *   name: Leads
 *   description: Leads
 */

/**
 * @swagger
 * /api/v1/leads/create:
 *  post:
 *      summary: Create Leads
 *      tags: [Leads]
 *      description: Create Leads
 *      parameters:
 *      -   name: leadName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadSubject
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadCompany
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadCompanyId
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadPosition
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadEmail
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: staticPhone
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: phone
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadWebsite
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadAddress
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadType
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadLevel
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadStatus
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadCompanyCount
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
 *      tags: [Leads]
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
 *      tags: [Leads]
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
 *      tags: [Leads]
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
 * /api/v1/leads/get-admin-leads:
 *  get:
 *      summary: Get Admin Leads
 *      tags: [Leads]
 *      description: Get Admin Leads
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
 * /api/v1/leads/get-leads-month:
 *  get:
 *      summary: Get Leads Month
 *      tags: [Leads]
 *      description: Get Leads Month
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
 * /api/v1/leads/get-leads-count:
 *  get:
 *      summary: Get Leads count
 *      tags: [Leads]
 *      description: Get Leads count
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
 * /api/v1/leads/edit-lead-admin:
 *  put:
 *      summary: Edit Admin Leads
 *      tags: [Leads]
 *      description: Esit Admin Leads
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 *      parameters:
 *      -   name: _id
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadSubject
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadPosition
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadEmail
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: staticPhone
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: phone
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadWebsite
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadAddress
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadType
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadSource
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadLevel
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadStatus
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadCompanyCount
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: createDate
 *          type: string
 *          in: formData
 *          required: true
 *
 */

/**
 * @swagger
 * /api/v1/leads/edit-lead-visitor:
 *  put:
 *      summary: Edit Visitor Leads
 *      tags: [Leads]
 *      description: Edit Visitor Leads
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 *      parameters:
 *      -   name: _id
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadSubject
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadPosition
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadEmail
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: staticPhone
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: phone
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadWebsite
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadAddress
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadType
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadSource
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadLevel
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadStatus
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadCompanyCount
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: createDate
 *          type: string
 *          in: formData
 *          required: true
 *
 */

/**
 * @swagger
 * /api/v1/leads/trendyol:
 *  post:
 *      summary: Get From TrendYol
 *      tags: [Leads]
 *      description: Get From TrendYol
 *      parameters:
 *      -   name: productId
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
 * /api/v1/leads/hepsi:
 *  post:
 *      summary: Get From Hepsi
 *      tags: [Leads]
 *      description: Get From Hepsi
 *      parameters:
 *      -   name: productId
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

// /**
//  * @swagger
//  * /api/v1/leads/remove:
//  *  delete:
//  *      summary: Leads Remove
//  *      tags: [Leads]
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

router.post("/create", LeadController.createLead);
router.post("/get-lead-by-id", bearerTokenVisitor, LeadController.getLeadById);
router.post("/get-lead-by-id-admin", bearerToken, LeadController.getLeadById);
router.post("/trendyol", LeadController.getDataFromTrendYol);
router.post("/hepsi", LeadController.getDataFromHepsi);
router.post("/create-contract", LeadController.createContract);

router.get("/getAll", LeadController.getAllLeads);
router.get("/get-leads-count", LeadController.getCountOfLeads);

router.get(
  "/get-visitor-leads",
  bearerTokenVisitor,
  LeadController.getAllLeadsOfVisitor
);
router.get(
  "/get-admin-leads",
  bearerToken,
  LeadController.getAllLeadsOfAdminUser
);
router.get("/get-contracts", LeadController.getAllContracts);

router.get("/get-leads-month", bearerToken, LeadController.getLeadsInMonth);

router.put("/edit-lead-admin", bearerToken, LeadController.editLead);
router.put("/edit-contract", LeadController.editContract);

router.put("/edit-lead-visitor", bearerTokenVisitor, LeadController.editLead);
router.delete("/remove", LeadController.removeLeads);
router.delete("/remove-contract", LeadController.removeContract);

// router.delete("/remove", CategoryController.removeCat);
module.exports = {
  leadsRouted: router,
};
