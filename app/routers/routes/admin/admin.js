const router = require("express").Router();

const {
  AdminController,
} = require("../../../http/controller/Admin/admin.controller");
const {
  AdsController,
} = require("../../../http/controller/Ads/ads.controller");
const { bearerToken } = require("../../../http/middleware/verifyAccessToken");

/**
 * @swagger
 * admin:
 *   name: Admin
 *   description: Admin
 */

/**
 * @swagger
 * /api/v1/admin/create-page:
 *  post:
 *      summary: Create Page
 *      tags: [Admin]
 *      description: Create Page
 *      parameters:
 *      -   name: pageRole
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: pageTitle
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: pageDes
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: pageType
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: pageName
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: pageAddress
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: pageCanonical
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: pageOpenGrapghUrl
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: pageOpenGrapghTitle
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: pageOpenGrapghDes
 *          type: string
 *          in: formData
 *          required: true
 *      -   name: pageOpenGrapghSiteName
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
 * /api/v1/admin/get-page:
 *  post:
 *      summary: Get Page
 *      tags: [Admin]
 *      description: Get Page
 *      parameters:
 *      -   name: pageRole
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

router.post("/create-page", AdminController.createPageData);
router.post("/get-page", AdminController.getPageDataByRole);

module.exports = {
  adminRouted: router,
};
