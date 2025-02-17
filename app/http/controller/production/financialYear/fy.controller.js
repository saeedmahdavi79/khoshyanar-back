const { UserModel } = require("../../../../models/auth/auth.model");
const {
  FYModel,
} = require("../../../../models/production/financialYear/fy.model");
const { UserPersonelModel } = require("../../../../models/users/users.model");
const { verifyAccessToken } = require("../../../../modules/functions");
const Controller = require("../../controller");

//Public Class
class FYController extends Controller {
  async createFy(req, res, next) {
    try {
      const { fyName, fyDes, fyValue, activeYear } = req.body;

      if (!fyName && !fyDes && !fyValue) {
        res.status(500).json({
          status: 500,
          message: "اطلاعات ارسالی کامل نمی باشد ، لطفا مجدد بازبینی کنید",
          requestDate: new Date().toLocaleDateString("fa-ir"),
        });
      } else {
        try {
          const createFY = await FYModel.create({
            fyName,
            fyDes,
            fyValue,
            activeYear,
          });

          res.status(202).json({
            status: 202,
            message: ` سال مالی : ${fyName} ایجاد شد`,
            createDate: new Date().toLocaleDateString("fa-ir"),
          });
        } catch (error) {
          next(error);
        }
      }
    } catch (err) {
      next(err);
    }
  }

  async getFy(req, res, next) {
    try {
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
        phone: verifyResult.phone,
      });
      const userPersonel = await UserPersonelModel.findOne({
        phone: verifyResult.phone,
      });
      try {
        let dataGet = [];

        if (user) {
          dataGet = (await FYModel.find({ adminId: user._id })).reverse();
        }
        if (userPersonel) {
          dataGet = (
            await FYModel.find({ adminId: userPersonel.adminUser })
          ).reverse();
        }
        res.status(202).json({
          status: 202,
          message: "اطلاعات دریافت شد",
          data: { dataGet },
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async deleteFy(req, res, next) {
    try {
      const { _id } = req.body;

      try {
        const dataGet = await FYModel.findOneAndDelete({ _id });

        res.status(202).json({
          status: 202,
          message: "اطلاعات حذف شد",

          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { FYController: new FYController() };
