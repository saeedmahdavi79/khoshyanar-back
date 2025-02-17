const Controller = require("../controller");
const request = require("request");

//Public Class
class SMSController extends Controller {
  async sendSMS(req, res, next) {
    try {
      const { numbers, message } = req.body;
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
              time: "",
            },
            json: true,
          },
          function (error, response, body) {
            if (!error && response.statusCode === 200) {
              //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
              res.status(202).json({
                status: 202,
                numbers,
                message: response.body,
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
}
module.exports = { SMSController: new SMSController() };
