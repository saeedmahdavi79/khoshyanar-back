const router = require("express").Router();

const {
  RoleController,
} = require("../../../http/controller/Role/role.controller");
const {
  VisitorController,
} = require("../../../http/controller/Visitor/visitor.controller");
const {
  TasksController,
} = require("../../../http/controller/tasks/tasks.controller");
const {
  bearerToken,
  bearerTokenVisitor,
} = require("../../../http/middleware/verifyAccessToken");

/**
 * @swagger
 * tasks:
 * Tasks:
 *   name: Tasks
 *   description: Tasks
 */

/**
 * @swagger
 * /api/v1/task/create-admin:
 *  post:
 *      summary: Create Task Admin
 *      tags: [Tasks]
 *      description: Create Task Admin
 *      parameters:
 *      -   name: taskTitle
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: taskDate
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: taskDes
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: taskStatus
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: taskId
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: expiresIn
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: targetDate
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
 * /api/v1/contact/create-by-admin:
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
 * /api/v1/task/create-visitor:
 *  post:
 *      summary: Create Visitor Admin
 *      tags: [Tasks]
 *      description: Create Visitor Admin
 *      parameters:
 *      -   name: taskTitle
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: taskDate
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: taskDes
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: taskStatus
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: taskId
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: expiresIn
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: targetDate
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
 *      tags: [Tasks]
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
 * /api/v1/task/change-status:
 *  put:
 *      summary: Change Task Status
 *      tags: [Tasks]
 *      description: Change Task Status
 *      parameters:
 *      -   name: _id
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: taskId
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: taskId
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
 * /api/v1/task/get-task-by-id-admin:
 *  post:
 *      summary: Get Lead By Id Admin
 *      tags: [Tasks]
 *      description: Get Lead By Id Admin
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
 *      tags: [Tasks]
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
 *      tags: [Tasks]
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
 * /api/v1/task/get-task-by-id-visitor:
 *  post:
 *      summary: Get Lead By Id Visitor
 *      tags: [Tasks]
 *      description: Get Lead By Id Visitor
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
 *      tags: [Tasks]
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
 * /api/v1/task/get-admin:
 *  get:
 *      summary: Get Admin Tasks
 *      tags: [Tasks]
 *      description: Get Admin Tasks
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
 * /api/v1/tasks/getAll:
 *  get:
 *      summary: Get All Contact
 *      tags: [Tasks]
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
 * /api/v1/task/get-visitor:
 *  get:
 *      summary: Get Visitor Tasks
 *      tags: [Tasks]
 *      description: Get Visitor Tasks
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
 *      tags: [Tasks]
 *      description: Get Visitors Contact
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
 * /api/v1/tasks/remove:
 *  delete:
 *      summary: Contact Remove
 *      tags: [Tasks]
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

router.post("/create-admin", bearerToken, TasksController.createTaskAdmin);
router.post("/create-task-other", bearerToken, TasksController.createTaskOther);

router.post(
  "/get-task-by-id-admin",
  bearerToken,
  TasksController.getTaskByIdAdmin
);
router.post(
  "/get-task-by-id-visitor",
  bearerToken,
  TasksController.getTaskByIdVisitor
);

router.post(
  "/create-visitor",
  bearerTokenVisitor,
  TasksController.createTaskVisitor
);

router.put("/change-status", bearerToken, TasksController.changeStatus);

router.get("/get-admin", bearerToken, TasksController.getAllTasksOfAdmin);
router.get(
  "/get-visitor",
  bearerTokenVisitor,
  TasksController.getAllTasksOfVisitor
);

router.delete("/remove", bearerToken, TasksController.removeTask);

module.exports = {
  tasksRouted: router,
};
