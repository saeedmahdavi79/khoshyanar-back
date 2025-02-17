const { UserModel } = require("../../../models/auth/auth.model");
const {
  FYModel,
} = require("../../../models/production/financialYear/fy.model");
const { VisitorModel } = require("../../../models/visitor/vistior.model");
const {
  verifyAccessToken,
  sha256pass,
  SignAccessToken,
  SignRefreshToken,
  SignAccessTokenVisitor,
  SignRefreshTokenVisitor,
} = require("../../../modules/functions");
const Controller = require("../controller");
var shamsi = require("shamsi-date-converter");

//Public Class
class VisitorController extends Controller {
  async createVisitor(req, res, next) {
    try {
      const {
        visitorName,
        email,
        phone,
        password,
        role,
        nationalId,
        userProfileImage,
        personelId,
        address,
        position,
        company,
        departemant,
        description,
      } = req.body;

      try {
        if (
          !visitorName &&
          !email &&
          !phone &&
          !password &&
          !nationalId &&
          !role
        ) {
          res.status(500).json({
            status: 500,
            message: "اطلاعات ارسالی کامل نمی باشد ، لطفا مجدد بازبینی کنید",
            requestDate: new Date().toLocaleDateString("fa-ir"),
          });
        } else {
          const authorization = req.headers.authorization;
          const [bearer, token] = authorization.split(" ");

          const verifyResult = await verifyAccessToken(token);
          const user = await UserModel.findOne({ phone: verifyResult.phone });
          const hashedPassword = await sha256pass(password);
          const createVisitor = await VisitorModel.create({
            visitorName,
            email,
            phone,
            password: hashedPassword,
            role,
            nationalId,
            userProfileImage,
            visitorCompany: user.company,
            adminUser: user._id.toString(),
            personelId,
            address,
            position,
            company,
            departemant,
            description,
            month: shamsi.gregorianToJalali(new Date())[1],
            year: shamsi.gregorianToJalali(new Date())[0],
            day: shamsi.gregorianToJalali(new Date())[2],
          });
          res.status(202).json({
            status: 202,
            message: ` کارشناس : ${visitorName} ساخته شد`,
            createDate: new Date().toLocaleDateString("fa-ir"),
          });
        }
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const hashedPassword = await sha256pass(password);
      const user = await VisitorModel.findOne({
        email,
        password: hashedPassword,
      });

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "Username or password was incorrect !",
          requestDate: new Date(),
        });
      }

      const accessToken = await SignAccessTokenVisitor(user._id);
      const refreshToken = await SignRefreshTokenVisitor(user._id);

      return res.status(200).json({
        status: 200,
        accessToken,
        refreshToken,
        message: "Login was successfull !",
        requestDate: new Date(),
      });
    } catch (error) {
      next(error);
    }
  }

  async getVisitor(req, res, next) {
    try {
      try {
        const authorization = req.headers.authorization;
        const [bearer, token] = authorization.split(" ");

        const verifyResult = await verifyAccessToken(token);
        const user = await UserModel.findOne({ phone: verifyResult.phone });

        const dataGet = (
          await VisitorModel.find({ adminUser: user._id.toString() })
        ).reverse();
        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: { dataGet },
          message: "کارشناسان دریافت شدند",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({ phone: verifyResult.phone });

      try {
        const dataGet = (
          await VisitorModel.find({ adminUser: user._id })
        ).reverse();
        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: { dataGet },
          message: "کارشناسان دریافت شدند",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getCountOfVisitors(req, res, next) {
    try {
      try {
        const authorization = req.headers.authorization;
        const [bearer, token] = authorization.split(" ");

        const verifyResult = await verifyAccessToken(token);
        const user = await UserModel.findOne({ phone: verifyResult.phone });

        const dataGet = await VisitorModel.find({
          adminUser: user._id.toString(),
        });

        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: dataGet.length,
          message: "تعداد کارشناسان دریافت شدند",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getUsersDataByToken(req, res, next) {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        res.status(401).json({
          status: 401,
          message: "کاربر احراز هویت نشده است",
          requestDate: new Date().toLocaleDateString("fa-ir"),
        });
      } else {
        const [bearer, token] = authorization.split(" ");
        if (bearer && bearer.toLowerCase() == "bearer") {
          if (token) {
            const verifyResult = await verifyAccessToken(token);
            const user = await VisitorModel.findOne({
              email: verifyResult.email,
            });
            if (!user) {
              res.status(401).json({
                status: 401,
                message: "کاربر احراز هویت نشده است",
                requestDate: new Date().toLocaleDateString("fa-ir"),
              });
            } else {
              res.status(200).json({
                status: 200,
                data: { user },
                message: "اطلاعات کاربر دریافت شد",
                requestDate: new Date().toLocaleDateString("fa-ir"),
              });
            }
          } else {
            res.status(401).json({
              status: 401,
              message: "کاربر احراز هویت نشده است",
              requestDate: new Date().toLocaleDateString("fa-ir"),
            });
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async editUser(req, res, next) {
    try {
      const {
        _id,
        visitorName,
        email,
        phone,
        password,
        role,
        nationalId,
        userProfileImage,
        personelId,
        address,
        position,
        company,
        departemant,
        description,
      } = req.body;

      if (!_id && !visitorName && !email && !phone && !password) {
        res.status(500).json({
          status: 500,
          message: "اطلاعات ارسالی کامل نمی باشد ، لطفا مجدد بازبینی کنید",
          requestDate: new Date().toLocaleDateString("fa-ir"),
        });
      } else {
        const hashedPassword = sha256pass(password);

        const putVisitor = await VisitorModel.findOneAndUpdate(
          { _id },
          {
            visitorName,
            email,
            phone,
            password: hashedPassword,
            role,
            nationalId,
            userProfileImage,
            personelId,
            address,
            position,
            company,
            departemant,
            description,
          }
        );
        res.status(202).json({
          status: 202,
          message: ` کارشناس : ${visitorName} ویرایش شد`,
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async getVisitorById(req, res, next) {
    try {
      try {
        const { _id } = req.body;

        const dataGet = await VisitorModel.find({ _id });

        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: { dataGet },
          message: "کارشناسان دریافت شد",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getVisitorsInMonth(req, res, next) {
    try {
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({ phone: verifyResult.phone });

      const getFyYear = await FYModel.findOne({
        adminId: user._id.toString(),
        activeYear: "active",
      });

      const farvardin = await VisitorModel.find({
        year: getFyYear.fyValue,
        month: "1",
        adminUser: user._id.toString(),
      });
      const ordibehesht = await VisitorModel.find({
        adminUser: user._id.toString(),
        year: getFyYear.fyValue,
        month: "2",
      });
      const khordad = await VisitorModel.find({
        adminUser: user._id.toString(),
        year: getFyYear.fyValue,
        month: "3",
      });
      const tir = await VisitorModel.find({
        adminUser: user._id.toString(),
        year: getFyYear.fyValue,
        month: "4",
      });
      const mordad = await VisitorModel.find({
        year: getFyYear.fyValue,
        month: "5",
        adminUser: user._id.toString(),
      });
      const shahrivar = await VisitorModel.find({
        adminUser: user._id.toString(),
        year: getFyYear.fyValue,
        month: "6",
      });
      const mehr = await VisitorModel.find({
        adminUser: user._id.toString(),
        year: getFyYear.fyValue,
        month: "7",
      });
      const aban = await VisitorModel.find({
        adminUser: user._id.toString(),
        year: getFyYear.fyValue,
        month: "8",
      });
      const azar = await VisitorModel.find({
        adminUser: user._id.toString(),
        year: getFyYear.fyValue,
        month: "9",
      });
      const dey = await VisitorModel.find({
        adminUser: user._id.toString(),
        year: getFyYear.fyValue,
        month: "10",
      });
      const bahman = await VisitorModel.find({
        adminUser: user._id.toString(),
        year: getFyYear.fyValue,
        month: "11",
      });
      const esfand = await VisitorModel.find({
        adminUser: user._id.toString(),
        year: getFyYear.fyValue,
        month: "12",
      });

      res.status(200).json({
        status: 200,
        message: "تعداد محصولات در ماه های مختلف سال مالی دریافت شد",
        year: getFyYear.fyValue,
        data: {
          farvardin: farvardin.length,
          ordibehesht: ordibehesht.length,
          khordad: khordad.length,
          tir: tir.length,
          mordad: mordad.length,
          shahrivar: shahrivar.length,
          mehr: mehr.length,
          aban: aban.length,
          azar: azar.length,
          dey: dey.length,
          bahman: bahman.length,
          esfand: esfand.length,
        },
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (error) {
      next(error);
    }
  }

  async removeVisitor(req, res, next) {
    try {
      const { _id } = req.body;
      try {
        const dataFind = await VisitorModel.findOne({
          _id,
        });
        if (dataFind) {
          const dataGet = await VisitorModel.findOneAndDelete({
            _id,
          });
          res.status(200).json({
            status: 200,
            requestDate: new Date(),

            message: "کارشناس با موفقیت حذف شد !",
          });

          if (!dataFind) {
            res.status(404).json({
              status: 404,
              requestDate: new Date(),
              message: "کارشناس موجود نیست !",
            });
          }
        }
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { VisitorController: new VisitorController() };
