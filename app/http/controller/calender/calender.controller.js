const { UserModel } = require("../../../models/auth/auth.model");
const { CalenderModel } = require("../../../models/calender/calender.model");
const { LeadModel } = require("../../../models/lead/lead.model");
const { UserPersonelModel } = require("../../../models/users/users.model");
const { VisitorModel } = require("../../../models/visitor/vistior.model");
const { verifyAccessToken } = require("../../../modules/functions");
const Controller = require("../controller");

//Public Class
class calenderController extends Controller {
  async createEvent(req, res, next) {
    try {
      const { color, end, start, title } = req.body;

      if (!color && !end && !start && !title) {
        res.status(500).json({
          status: 500,
          message: "اطلاعات ارسالی کامل نمی باشد ، لطفا مجدد بازبینی کنید",
          requestDate: new Date().toLocaleDateString("fa-ir"),
        });
      } else {
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

          if (user) {
            const createCal = await CalenderModel.create({
              color,
              end,
              start,
              title,
              adminUser: user._id,
            });
          }

          if (userPersonel) {
            const createCal = await CalenderModel.create({
              color,
              end,
              start,
              title,
              adminUser: userPersonel._id,
            });
          }

          res.status(202).json({
            status: 202,
            message: ` ایونت : ${title} ایجاد شد`,
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

  async getEvent(req, res, next) {
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

      let dataGet = [];
      let dataGet2 = [];

      if (user) {
        dataGet = await CalenderModel.find({
          adminUser: user._id,
        });
      }

      if (userPersonel) {
        dataGet2 = await CalenderModel.find({
          adminUser: userPersonel._id,
        });
      }
      const mergedData = [...dataGet, ...dataGet2];

      res.status(202).json({
        status: 202,
        data: { mergedData },
        message: ` ایونت دریافت شد`,
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { calenderController: new calenderController() };
