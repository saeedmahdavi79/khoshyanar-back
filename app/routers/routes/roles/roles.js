const router = require("express").Router();

const {
  RoleController,
} = require("../../../http/controller/Role/role.controller");
const { bearerToken } = require("../../../http/middleware/verifyAccessToken");

/**
 * @swagger
 * roles:
 *   name: Roles
 *   description: Roles
 */

/**
 * @swagger
 * /api/v1/roles/create:
 *  post:
 *      summary: Create Roles
 *      tags: [Roles]
 *      description: Create Roles
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
 * /api/v1/roles/get:
 *  get:
 *      summary: Get Roles
 *      tags: [Roles]
 *      description: Get Roles
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
 * /api/v1/roles/remove:
 *  delete:
 *      summary: Remove Roles
 *      tags: [Roles]
 *      description: Remove Roles
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

router.post("/create", bearerToken, RoleController.createRole);
router.get("/get", bearerToken, RoleController.getRole);
router.delete("/remove", bearerToken, RoleController.removeRole);
module.exports = {
  rolesRouted: router,
};
