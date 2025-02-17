const {
  VideoUploadController,
} = require("../../../http/controller/upload/videos.upload.controller");
const { upload_multer } = require("../../../modules/multer.videos");

const router = require("express").Router();
/**
 * @swagger
 * Upload:
 *   name: Upload
 *   description: Upload Video
 */

/**
 * @swagger
 * /api/v1/upload-video/video:
 *  post:
 *      summary: Upload Video Curse
 *      tags: [Upload]
 *      description: Upload Video Curse
 *      parameters:
 *      -   name: video
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
  "/video",
  upload_multer.single("video"),
  VideoUploadController.uploadVideo
);

module.exports = {
  uploadVideoRouted: router,
};
