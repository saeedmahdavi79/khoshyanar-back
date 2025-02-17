const router = require("express").Router();

const {
  AdsController,
} = require("../../../http/controller/Ads/ads.controller");
const { ChatController } = require("../../../http/controller/chat/chat.controller");
const { bearerToken } = require("../../../http/middleware/verifyAccessToken");

/**
 * @swagger
 * chat:
 *   name: Chat
 *   description: Chat
 */

/**
 * @swagger
 * /api/v1/chat/create:
 *  post:
 *      summary: Create Chat
 *      tags: [Chat]
 *      description: Create Chat
 *      parameters:
 *      -   name: chatUserId
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



router.post("/create", ChatController.createChat);

module.exports = {
  chatRouthed: router,
};
