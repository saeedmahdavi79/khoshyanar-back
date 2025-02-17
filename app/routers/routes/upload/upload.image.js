const {
  ImageUploadController,
} = require("../../../http/controller/upload/image.upload.controller");
const { bearerToken } = require("../../../http/middleware/verifyAccessToken");
const { upload_multer } = require("../../../modules/multer.images");

const router = require("express").Router();
/**
 * @swagger
 * Upload:
 *   name: Upload
 *   description: Upload Image
 */

/**
 * @swagger
 * /api/v1/imageUpload/image:
 *  post:
 *      summary: Upload Image
 *      tags: [Upload]
 *      description: Upload Image
 *      parameters:
 *      -   name: image
 *          type: file
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

router.post(
  "/image",
  upload_multer.single("image"),
  bearerToken,
  ImageUploadController.uploadImage
);

module.exports = {
  uploadImageRouted: router,
};
