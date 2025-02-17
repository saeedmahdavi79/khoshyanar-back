const router = require("express").Router();

const {
  ContactController,
} = require("../../../http/controller/Contacts/contacts.controller");
const {
  VisitorController,
} = require("../../../http/controller/Visitor/visitor.controller");
const {
  bearerToken,
  bearerTokenVisitor,
} = require("../../../http/middleware/verifyAccessToken");

/**
 * @swagger
 * contacts:
 *   name: Contacts
 *   description: Contacst
 */

/**
 * @swagger
 * /api/v1/contact/create:
 *  post:
 *      summary: Create Contacts
 *      tags: [Contacts]
 *      description: Create Contacts
 *      parameters:
 *      -   name: contactName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: contactCompany
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: contactCompanyId
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: contactPosition
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
 *      -   name: fax
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: email
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: address
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: nationalCode
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: birthDate
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: marriedDate
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: userImageProfile
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: description
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadId
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
 * /api/v1/contact/edit-admin:
 *  put:
 *      summary: Edit Contacts
 *      tags: [Contacts]
 *      description: Edit Contacts
 *      parameters:
 *      -   name: _id
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: contactName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: contactCompany
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: contactCompanyId
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: contactPosition
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
 *      -   name: fax
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: email
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: address
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: nationalCode
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: birthDate
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: marriedDate
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: userImageProfile
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: description
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadId
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
 * /api/v1/contact/edit-visitor:
 *  put:
 *      summary: Edit Contacts
 *      tags: [Contacts]
 *      description: Edit Contacts
 *      parameters:
 *      -   name: _id
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: contactName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: contactCompany
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: contactCompanyId
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: contactPosition
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
 *      -   name: fax
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: email
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: address
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: nationalCode
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: birthDate
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: marriedDate
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: userImageProfile
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: description
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: leadId
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
 * /api/v1/contact/get-contact-by-id:
 *  post:
 *      summary: Get Contacts By Id
 *      tags: [Contacts]
 *      description: Get Contacts By Id
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
 * /api/v1/contact/get-contact-by-id-admin:
 *  post:
 *      summary: Get Contacts By Admin Id
 *      tags: [Contacts]
 *      description: Get Contacts Admin By Id
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
 * /api/v1/contact/getAll:
 *  get:
 *      summary: Get All Contact
 *      tags: [Contacts]
 *      description: Get All Contact
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
 * /api/v1/contact/get-visitors-contacts:
 *  get:
 *      summary: Get Visitors Contact
 *      tags: [Contacts]
 *      description: Get Visitors Contact
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
 * /api/v1/contact/get-admin-contacts:
 *  get:
 *      summary: Get Admin Contact
 *      tags: [Contacts]
 *      description: Get Admin Contact
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
 * /api/v1/contact/get-contacts-in-month:
 *  get:
 *      summary: Get Contact In Month
 *      tags: [Contacts]
 *      description: Get Contact In Month
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
 * /api/v1/contact/remove:
 *  delete:
 *      summary: Contact Remove
 *      tags: [Contacts]
 *      description: Contact Remove
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

router.post("/create", bearerTokenVisitor, ContactController.createContact);
router.post("/create-customer", bearerToken, ContactController.createCustomer);
router.post(
  "/get-customers-data",
  bearerToken,
  ContactController.getCustomersMandeAndScore
);
router.get("/get-customers-state", ContactController.getCustomersInState);

router.post("/add-order", ContactController.addOrder);
router.post("/confirm-order", bearerToken, ContactController.orderAdminConfirm);
router.post(
  "/confirm-order-operator",
  bearerToken,
  ContactController.orderOpConfirm
);

router.post("/get-gardesh", bearerToken, ContactController.getGhardesh);
router.post("/get-mande", bearerToken, ContactController.getMandeh);

router.post(
  "/get-contact-by-id",
  bearerTokenVisitor,
  ContactController.getVisitorContactById
);
router.post(
  "/get-contact-by-id-admin",
  bearerToken,
  ContactController.getAdminContactById
);
router.put("/edit-visitor", bearerTokenVisitor, ContactController.editContact);
router.put("/edit-admin", bearerToken, ContactController.editContact);
router.put("/edit-customer", bearerToken, ContactController.editCustomer);
router.put(
  "/transfer-customer",
  bearerToken,
  ContactController.transferCustomer
);

router.get(
  "/get-visitors-contacts",
  bearerTokenVisitor,
  ContactController.getVisitorContacts
);
router.get("/getAll", ContactController.getAllContacts);
router.get("/get-orders", ContactController.getOrder);

router.get(
  "/get-visitor-data",
  bearerTokenVisitor,
  VisitorController.getUsersDataByToken
);
router.get(
  "/get-admin-contacts",
  bearerToken,
  ContactController.getAdminContacts
);

router.get(
  "/get-contacts-in-month",
  bearerToken,
  ContactController.getContactsInMonth
);

router.get(
  "/get-contacts-count",
  bearerToken,
  ContactController.getCountOfContacts
);

router.get("/get-customers", bearerToken, ContactController.getCustomers);

router.delete("/remove", bearerTokenVisitor, ContactController.removeContacts);
router.delete("/remove-cus", ContactController.removeCustomer);

module.exports = {
  contactsRothed: router,
};
