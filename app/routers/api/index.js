const homeController = require("../../http/controller/api/home.controller");

const router = require("express").Router();
/**
 * @swagger
 * tags:
 *   name: Index
 *   description: Index page
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: Index Page
 *      tags: [Index]
 *      description: Index of route
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: not found
 */

router.get("/", homeController.indexPage);
module.exports = {
  HomeRoutes: router,
};
