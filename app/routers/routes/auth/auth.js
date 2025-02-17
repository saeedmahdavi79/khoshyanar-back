const router = require("express").Router();

const {
  UserController,
} = require("../../../http/controller/auth/auth.controller");
const {
  ChartController,
} = require("../../../http/controller/chart/chart.controller");
const { bearerToken } = require("../../../http/middleware/verifyAccessToken");

/**
 * @swagger
 * auth:
 *   name: Auth
 *   description: User Auth
 */

/**
 * @swagger
 * /api/v1/auth/create:
 *  post:
 *      summary: Signup to server
 *      tags: [Auth]
 *      description: Signup to the server
 *      parameters:
 *      -   name: email
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: birthDate
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
 *      -   name: role
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
 *      -   name: verified
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: type
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
 * /api/v1/auth/login:
 *  post:
 *      summary: Login
 *      tags: [Auth]
 *      description: Login
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
 * /api/v1/auth/sign-check:
 *  post:
 *      summary: Sign Check
 *      tags: [Auth]
 *      description: Sign Check
 *      parameters:
 *      -   name: signCode
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
 * /api/v1/auth/get:
 *  get:
 *      summary: Get
 *      tags: [Auth]
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
 * /api/v1/auth/get-user-data:
 *  get:
 *      summary: Get
 *      tags: [Auth]
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
 * /api/v1/auth/remove:
 *  delete:
 *      summary: Remove User
 *      tags: [Auth]
 *      description: Remove User
 *      parameters:
 *      -   name: email
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

router.post("/create", UserController.createUser);
router.post("/login", UserController.login);
router.post("/sign-check", UserController.signCodeChecker);
router.post("/create-notif", UserController.createNotif);
router.post("/create-chart", ChartController.createChart);
router.post("/create-message", UserController.createChat);
router.post("/get-message", UserController.getChats);

router.get("/get-user-sign", UserController.getUserSignCode);
router.get("/get-notif", UserController.getNotifs);
router.get("/get-chart", ChartController.getChart);

router.get("/get", UserController.getUsers);
router.get("/get-user-data", UserController.getUsersDataByToken);
router.get("/get-setting", UserController.getUserSettings);

router.put("/setting-update", UserController.updateSetting);

router.delete("/remove", UserController.removeUser);
router.delete("/remove-notif", UserController.removeNotif);

module.exports = {
  authRouted: router,
};
