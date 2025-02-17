const { Types } = require("mongoose");
const {
  FormulaModel,
} = require("../../../../models/production/product/formula/formula.model");
const ProductModel = require("../../../../models/production/product/product.model");
const {
  SourceModel,
} = require("../../../../models/production/source/source.model");
const {
  SrcContentModel,
} = require("../../../../models/production/source/sourceContent/src.model");
const Controller = require("../../../controller/controller");
const { verifyAccessToken } = require("../../../../modules/functions");
const { UserModel } = require("../../../../models/auth/auth.model");
var shamsi = require("shamsi-date-converter");
const {
  FYModel,
} = require("../../../../models/production/financialYear/fy.model");
const { UserPersonelModel } = require("../../../../models/users/users.model");

//Public Class
class FormulaController extends Controller {
  async createFormula(req, res, next) {
    try {
      const { title, childs } = req.body;
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");
      const getFyYear = await FYModel.findOne({
        activeYear: "active",
      });
      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
        phone: verifyResult.phone,
      });

      const userPersonel = await UserPersonelModel.findOne({
        phone: verifyResult.phone,
      });

      if (!childs) {
        res.status(500).json({
          status: 500,
          message: "اطلاعات ارسالی بازبینی شود",
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      } else {
        if (user) {
          const formulaAdd = await FormulaModel.create({
            childs: childs,
            title,
            adminId: user._id,
            month: shamsi.gregorianToJalali(new Date())[1],
            year: getFyYear.fyValue,
          });
        }

        if (userPersonel) {
          const formulaAdd = await FormulaModel.create({
            childs: childs,
            title,
            adminId: userPersonel.adminUser,
            month: shamsi.gregorianToJalali(new Date())[1],
            year: getFyYear.fyValue,
          });
        }

        res.status(200).json({
          status: 200,
          message: "فرمولاسیون ساخته شد",
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async getAllFormulas(req, res, next) {
    try {
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
          dataGet = (
            await FormulaModel.find({
              adminId: user._id,
            })
          ).reverse();
        }
        if (userPersonel) {
          dataGet = (
            await FormulaModel.find({
              adminId: userPersonel.adminUser,
            })
          ).reverse();
        }

        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: { dataGet },
          message: "داده ها دریافت شدند !",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getFormulasById(req, res, next) {
    try {
      const { _id } = req.body;
      try {
        const dataGet = await FormulaModel.find({ _id });
        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: { dataGet },
          message: "داده ها دریافت شدند !",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getFormulaCountFromStorage(req, res, next) {
    try {
      const { _id } = req.body;
      // const dataParsed = await JSON.parse(_id);
      const objectIds = _id.ids.map((id) => new Types.ObjectId(id));
      try {
        const dataGet = await ProductModel.find({ _id: { $in: objectIds } });
        const allDataCount = await dataGet.map((data) => ({
          id: data._id,
          count: data.mainCount,
        }));
        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: { allDataCount },
          message: "داده ها دریافت شدند !",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getFormulaInMonth(req, res, next) {
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

      let DataUser;

      if (user) {
        DataUser = user._id;
      }
      if (userPersonel) {
        DataUser = userPersonel.adminUser;
      }

      const getFyYear = await FYModel.findOne({
        activeYear: "active",
        adminId: DataUser,
      });
      const farvardin = (
        await FormulaModel.find({
          year: getFyYear.fyValue,
          month: "1",
          adminId: DataUser,
        })
      ).length;
      const ordibehesht = (
        await FormulaModel.find({
          year: getFyYear.fyValue,
          month: "2",
          adminId: DataUser,
        })
      ).length;
      const khordad = (
        await FormulaModel.find({
          year: getFyYear.fyValue,
          month: "3",
          adminId: DataUser,
        })
      ).length;
      const tir = (
        await FormulaModel.find({
          year: getFyYear.fyValue,
          month: "4",
          adminId: DataUser,
        })
      ).length;
      const mordad = (
        await FormulaModel.find({
          year: getFyYear.fyValue,
          month: "5",
          adminId: DataUser,
        })
      ).length;
      const shahrivar = (
        await FormulaModel.find({
          year: getFyYear.fyValue,
          month: "6",
          adminId: DataUser,
        })
      ).length;
      const mehr = (
        await FormulaModel.find({
          year: getFyYear.fyValue,
          month: "7",
          adminId: DataUser,
        })
      ).length;
      const aban = (
        await FormulaModel.find({
          year: getFyYear.fyValue,
          month: "8",
          adminId: DataUser,
        })
      ).length;
      const azar = (
        await FormulaModel.find({
          year: getFyYear.fyValue,
          month: "9",
          adminId: DataUser,
        })
      ).length;
      const dey = (
        await FormulaModel.find({
          year: getFyYear.fyValue,
          month: "10",
          adminId: DataUser,
        })
      ).length;
      const bahman = (
        await FormulaModel.find({
          year: getFyYear.fyValue,
          month: "11",
          adminId: DataUser,
        })
      ).length;
      const esfand = (
        await FormulaModel.find({
          year: getFyYear.fyValue,
          month: "12",
          adminId: DataUser,
        })
      ).length;

      res.status(200).json({
        status: 200,
        message: "تعداد محصولات در ماه های مختلف سال مالی دریافت شد",
        year: getFyYear.fyValue,
        data: {
          farvardin,
          ordibehesht,
          khordad,
          tir,
          mordad,
          shahrivar,
          mehr,
          aban,
          azar,
          dey,
          bahman,
          esfand,
        },
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (error) {
      next(error);
    }
  }

  async getFormulaCount(req, res, next) {
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

      let data = [];
      if (user) {
        data = await FormulaModel.find({
          adminId: user._id,
        }).count();
      }
      if (userPersonel) {
        data = await FormulaModel.find({
          adminId: userPersonel.adminUser,
        }).count();
      }

      res.status(200).json({
        status: 200,
        message: "تعداد پیشبینی ها کلی دریافت شد",
        data: data,
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (error) {
      next(error);
    }
  }

  async removeFrm(req, res, next) {
    try {
      try {
        const { _id } = req.body;

        const dataRemove = await FormulaModel.findOneAndDelete({
          _id,
        });

        res.status(200).json({
          status: 200,
          message: ` فرمول حذف شد`,
          createDate: new Date(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }
}
module.exports = { FormulaController: new FormulaController() };
