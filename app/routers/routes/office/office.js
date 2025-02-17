const router = require("express").Router();

const {
  LeadController,
} = require("../../../http/controller/Lead/Lead.controller");
const {
  OfficeController,
} = require("../../../http/controller/office/office.controller");
const {
  bearerToken,
  bearerTokenVisitor,
} = require("../../../http/middleware/verifyAccessToken");

/**
 * @swagger
 * office:
 *   name: Office
 *   description: Office
 */

/**
 * @swagger
 * /api/v1/office/create-leave:
 *  post:
 *      summary: Create Leave
 *      tags: [Office]
 *      description: Create Leave
 *      parameters:
 *      -   name: requesterName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: date
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: length
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
 * /api/v1/office/create-personel:
 *  post:
 *      summary: Create personel
 *      tags: [Office]
 *      description: Create personel
 *      parameters:
 *      -   name: sex
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: name
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: lastName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: userName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: password
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: phone
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: birth
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: email
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: type
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: role
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
 * /api/v1/office/create-zonkan:
 *  post:
 *      summary: Create zonkan
 *      tags: [Office]
 *      description: Create zonkan
 *      parameters:
 *      -   name: zonkanName
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
 * /api/v1/office/create-letter:
 *  post:
 *      summary: Create letter
 *      tags: [Office]
 *      description: Create letter
 *      parameters:
 *      -   name: subject
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: zonkan
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: recivers
 *          type: array
 *          in: formData
 *          required: true
 *      -   name: doc
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: number
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: content
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
 * /api/v1/office/edit-personel:
 *  put:
 *      summary: Edit personel
 *      tags: [Office]
 *      description: Edit personel
 *      parameters:
 *      -   name: _id
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: sex
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: name
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: lastName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: userName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: phone
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: birth
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: email
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: type
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: role
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
 * /api/v1/office/get-admin-leave:
 *  get:
 *      summary: Get Leave
 *      tags: [Office]
 *      description: Get Leave
 *      parameters:
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
 * /api/v1/office/get-zonkan:
 *  get:
 *      summary: Get Zonkan
 *      tags: [Office]
 *      description: Get Zonkan
 *      parameters:
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
 * /api/v1/office/get-letters:
 *  get:
 *      summary: Get letters
 *      tags: [Office]
 *      description: Get letters
 *      parameters:
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
 * /api/v1/office/get-personel:
 *  get:
 *      summary: Get letters
 *      tags: [Office]
 *      description: Get letters
 *      parameters:
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
 * /api/v1/office/remove-personel:
 *  delete:
 *      summary: Remove personel
 *      tags: [Office]
 *      description: Remove personel
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
 * /api/v1/office/remove-zonkan:
 *  delete:
 *      summary: Remove Zonkan
 *      tags: [Office]
 *      description: Remove Zonkan
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
 * /api/v1/office/remove-letter:
 *  delete:
 *      summary: Remove Letter
 *      tags: [Office]
 *      description: Remove Letter
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

router.post("/create-leave", bearerToken, OfficeController.createLeave);
router.post("/create-personel", bearerToken, OfficeController.createPersonel);
router.post("/create-zonkan", bearerToken, OfficeController.createZonkan);
router.post("/create-letter", bearerToken, OfficeController.createLetter);
//
router.get("/get-personel",  OfficeController.getPersonels);
router.get("/get-admin-leave", bearerToken, OfficeController.getLeaveAdmin);
router.get("/get-zonkan", bearerToken, OfficeController.getZonkan);
router.get("/get-letters", bearerToken, OfficeController.getLetters);
router.get("/get-leaves", bearerToken, OfficeController.getLeaves);

//
router.put("/edit-personel", bearerToken, OfficeController.editPersonel);
router.put("/conf-letter", bearerToken, OfficeController.letterAdminConfirm);
router.put("/conf-leave", bearerToken, OfficeController.leaveAdminConfirm);

router.put("/edit-zonkan", bearerToken, OfficeController.editZonkan);
//
router.delete(
  "/remove-personel",
  bearerToken,
  OfficeController.removePersonels
);
router.delete("/remove-letter", bearerToken, OfficeController.removeLetter);
router.delete("/remove-zonkan", bearerToken, OfficeController.removeZonkan);

module.exports = {
  officeRouted: router,
};
