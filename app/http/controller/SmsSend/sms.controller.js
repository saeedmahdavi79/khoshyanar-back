const { UserModel } = require("../../../models/auth/auth.model");
const { SmsModel } = require("../../../models/sms/sms.model");
const { UserPersonelModel } = require("../../../models/users/users.model");
const { verifyAccessToken } = require("../../../modules/functions");
const Controller = require("../controller");
const request = require("request");

//Public Class
class SMSController extends Controller {
  async sendSMS(req, res, next) {
    try {
      const { numbers, message, title } = req.body;

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
        request.post(
          {
            url: "http://ippanel.com/api/select",
            body: {
              op: "send",
              uname: "09146922788",
              pass: "Afrapardaz@1402",
              message: message,
              from: "3000505 ",
              to: numbers,
            },
            json: true,
          },
          async function (error, response, body) {
            if (!error && response.statusCode === 200) {
              //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE

              if (user) {
                const createSms = await SmsModel.create({
                  title,
                  message,
                  numbers,
                  administrator: user._id,
                  adminUser: user._id,
                  adminUserName: user.name + " " + user.lastName,
                });
              }

              if (userPersonel) {
                const createSms = await SmsModel.create({
                  title,
                  message,
                  numbers,
                  administrator: userPersonel.adminUser,
                  adminUser: userPersonel._id,
                  adminUserName:
                    userPersonel.name + " " + userPersonel.lastName,
                });
              }

              res.status(202).json({
                status: 202,
                message: "پیام ارسال شد",
                createDate: new Date(),
              });
            } else {
              console.log("whatever you want");
            }
          }
        );
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async getSms(req, res, next) {
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

      if (user) {
        (dataGet = await SmsModel.find({
          administrator: user._id,
        })).reverse();
      }

      if (userPersonel) {
        (dataGet = await SmsModel.find({
          adminUser: userPersonel._id,
        })).reverse();
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
  }
}
module.exports = { SMSController: new SMSController() };
