const {
  SourceController,
} = require("../../../../http/controller/production/sources/source.controller");
const {
  bearerToken,
} = require("../../../../http/middleware/verifyAccessToken");

const router = require("express").Router();

/**
 * @swagger
 * sources:
 *   name: Sources
 *   description: Sources
 */

/**
 * @swagger
 * /api/v1/source/create:
 *  post:
 *      summary: Create Sources
 *      tags: [Sources]
 *      description: Create Sources
 *      parameters:
 *      -   name: sourceName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: sourceDes
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: vahed
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: dama
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: type
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: expireDate
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
 * /api/v1/source/create-content:
 *  post:
 *      summary: Create Sources Content
 *      tags: [Sources]
 *      description: Create Sources Content
 *      parameters:
 *      -   name: sourceCode
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: productId
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: sourceName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: sourceDes
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: firstCount
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: entryCount
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: exportCount
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: sourceId
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
 * /api/v1/source/get-by-id:
 *  post:
 *      summary: Get Sources By Id
 *      tags: [Sources]
 *      description: Get Sources By Id
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
 * /api/v1/source/get-src-content-by-source-id:
 *  post:
 *      summary: Get Sources Content By Id
 *      tags: [Sources]
 *      description: Get Sources Content By Id
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
 * /api/v1/source/get:
 *  get:
 *      summary: Get Sources
 *      tags: [Sources]
 *      description: Get Sources
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
 * /api/v1/source/getby-token:
 *  get:
 *      summary: Get Sources By Token
 *      tags: [Sources]
 *      description: Get Sources By Token
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
 * /api/v1/source/get-src-content:
 *  get:
 *      summary: Get Sources Content
 *      tags: [Sources]
 *      description: Get Sources Content
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
 * /api/v1/source/get-src-user:
 *  get:
 *      summary: Get Sources User
 *      tags: [Sources]
 *      description: Get Sources User
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
 * /api/v1/source/remove:
 *  delete:
 *      summary: Remove Sources
 *      tags: [Sources]
 *      description: Remove Sources
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

router.post("/create", bearerToken, SourceController.createSource);
router.post(
  "/create-content",
  bearerToken,
  SourceController.createSourceContent
);
router.post("/get-by-id", bearerToken, SourceController.getSourceById);
router.post(
  "/get-src-content-by-source-id",
  bearerToken,
  SourceController.getSourceContentBySourceId
);

router.get("/get", SourceController.getSource);
router.get("/get-by-token", bearerToken, SourceController.getSourceByToken);
router.get("/get-src-content", SourceController.getSourceContent);
router.get("/get-src-user", SourceController.getSourceUser);

router.delete("/remove", SourceController.removeSource);
module.exports = {
  sourceRouted: router,
};
