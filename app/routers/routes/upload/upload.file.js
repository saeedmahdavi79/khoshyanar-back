const {
  FileUploadController,
} = require("../../../http/controller/upload/file.upload.controller");

const { upload_multer } = require("../../../modules/multer.files");

const router = require("express").Router();
/**
 * @swagger
 * Upload:
 *   name: Upload
 *   description: Upload File
 */

/**
 * @swagger
 * /api/v1/upload-file/file:
 *  post:
 *      summary: Upload File
 *      tags: [Upload]
 *      description: Upload File
 *      parameters:
 *      -   name: file
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
  "/file",
  upload_multer.single("file"),
  FileUploadController.uploadFile
);

module.exports = {
  uploadFileRouted: router,
};
