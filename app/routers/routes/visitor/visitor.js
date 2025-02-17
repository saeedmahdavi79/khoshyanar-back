const router = require("express").Router();

const {
  VisitorController,
} = require("../../../http/controller/Visitor/visitor.controller");
const {
  bearerToken,
  bearerTokenVisitor,
} = require("../../../http/middleware/verifyAccessToken");

/**
 * @swagger
 * visitor:
 *   name: Visitor
 *   description: Visitor
 */

/**
 * @swagger
 * /api/v1/visitor/create:
 *  post:
 *      summary: Create Visitor
 *      tags: [Visitor]
 *      description: Create Visitor
 *      parameters:
 *      -   name: visitorName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: email
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: phone
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: password
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: role
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: nationalId
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: userProfileImage
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: personelId
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: address
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: position
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: company
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: departemant
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: adress
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: description
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
 * /api/v1/visitor/login:
 *  post:
 *      summary: Login Visitor
 *      tags: [Visitor]
 *      description: Login Visitor
 *      parameters:
 *      -   name: email
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: password
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
 * /api/v1/visitor/getbyid:
 *  post:
 *      summary: Get Visitor by id
 *      tags: [Visitor]
 *      description: Get Visitor by id
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
 * /api/v1/visitor/edit:
 *  put:
 *      summary: Edit Visitor
 *      tags: [Visitor]
 *      description: Edit Visitor
 *      parameters:
 *      -   name: _id
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: visitorName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: email
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: phone
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: password
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: role
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: nationalId
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: userProfileImage
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: personelId
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: address
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: position
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: company
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: departemant
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: adress
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: description
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
 * /api/v1/visitor/get:
 *  get:
 *      summary: Get Visitor
 *      tags: [Visitor]
 *      description: Get Visitor
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
 * /api/v1/visitor/getAll:
 *  get:
 *      summary: Get All Visitor
 *      tags: [Visitor]
 *      description: Get All Visitor
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
 * /api/v1/visitor/get-visitor-data:
 *  get:
 *      summary: Get
 *      tags: [Visitor]
 *      description: Get
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
 * /api/v1/visitor/get-visitor-count:
 *  get:
 *      summary: Get Count
 *      tags: [Visitor]
 *      description: Get Count
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
 * /api/v1/visitor/get-visitor-in-month:
 *  get:
 *      summary: Get Visitor In Month
 *      tags: [Visitor]
 *      description: Get Visitor In Month
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
 * /api/v1/visitor/remove:
 *  delete:
 *      summary: Visitor Remove
 *      tags: [Visitor]
 *      description: Visitor Remove
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

router.post("/create", bearerToken, VisitorController.createVisitor);
router.post("/login", VisitorController.login);
router.post("/getbyid", bearerToken, VisitorController.getVisitorById);
router.put("/edit", bearerToken, VisitorController.editUser);
router.get("/get", bearerToken, VisitorController.getVisitor);
router.get("/getAll", VisitorController.getAll);
router.get(
  "/get-visitor-count",
  bearerToken,
  VisitorController.getCountOfVisitors
);

router.get(
  "/get-visitor-data",
  bearerTokenVisitor,
  VisitorController.getUsersDataByToken
);

router.get(
  "/get-visitor-in-month",
  bearerToken,
  VisitorController.getVisitorsInMonth
);
router.delete("/remove", bearerToken, VisitorController.removeVisitor);
module.exports = {
  visitorRothed: router,
};
