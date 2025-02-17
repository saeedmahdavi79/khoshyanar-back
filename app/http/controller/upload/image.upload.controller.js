class ImageUploadController {
  async uploadImage(req, res, next) {
    try {
      if (Object.keys(req.file).length == 0) {
        throw {
          status: 400,
          message: "لطفا یک عکس انتخاب کنید",
        };
      }

      const filePath = req.file?.path.replaceAll("\\", "/").substring(7);
      res.status(200).json({
        status: 200,
        requsetDate: new Date(),
        messages: "آپلود عکس با موفقیت انجام شد",
        imageUrl: filePath,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { ImageUploadController: new ImageUploadController() };
