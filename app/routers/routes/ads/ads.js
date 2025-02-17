const router = require("express").Router();

const {
  AdsController,
} = require("../../../http/controller/Ads/ads.controller");
const { bearerToken } = require("../../../http/middleware/verifyAccessToken");

/**
 * @swagger
 * ads:
 *   name: Ads
 *   description: Ads
 */

/**
 * @swagger
 * /api/v1/ads/create:
 *  post:
 *      summary: Create Ads
 *      tags: [Ads]
 *      description: Create Ads
 *      parameters:
 *      -   name: addLocation
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: addName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: city
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: lat
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: lon
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
 *      -   name: postalCode
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: des
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: view
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: cat
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: mainPicture
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
 * /api/v1/ads/get:
 *  get:
 *      summary: Get Ads
 *      tags: [Ads]
 *      description: Get Ads
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
 * /api/v1/ads/remove:
 *  delete:
 *      summary: Ads Remove
 *      tags: [Ads]
 *      description: Ads Remove
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

router.post("/create", AdsController.createAd);
router.get("/get", AdsController.getAds);
router.delete("/remove", AdsController.removeAd);
module.exports = {
  adsRouted: router,
};
