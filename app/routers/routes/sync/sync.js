const router = require("express").Router();

const {
  AdsController,
} = require("../../../http/controller/Ads/ads.controller");
const { SyncDataController } = require("../../../http/controller/syncData/sync.controller");
const { bearerToken } = require("../../../http/middleware/verifyAccessToken");

/**
 * @swagger
 * ads:
 *   name: Sync
 *   description: Sync
 */



/**
 * @swagger
 * /api/v1/sync/get-personels:
 *  post:
 *      summary: Get Sync
 *      tags: [Sync]
 *      description: Get Sync
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
 * /api/v1/sync/get-customers:
 *  post:
 *      summary: Get Sync
 *      tags: [Sync]
 *      description: Get Sync
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not Found
 *          500:
 *              description: Internal Server Error
 */

router.post("/get-personels", SyncDataController.getPersonelsSync);
router.post("/get-customers", SyncDataController.getCustomerSync);
router.post("/get-products", SyncDataController.getProductsSync);
router.post("/get-stores", SyncDataController.getStoresSync);
router.post("/get-city", SyncDataController.getCitys);
router.get("/get-states", SyncDataController.getStates);

module.exports = {
  syncRouted: router,
};
