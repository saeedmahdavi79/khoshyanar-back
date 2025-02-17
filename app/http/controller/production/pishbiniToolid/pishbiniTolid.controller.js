const { Types } = require("mongoose");
const {
  PishbiniToolidModel,
} = require("../../../../models/production/pishbiniToolid/pishbiniToolid.model");
const {
  FYModel,
} = require("../../../../models/production/financialYear/fy.model");
const Controller = require("../../controller");
const {
  FormulaModel,
} = require("../../../../models/production/product/formula/formula.model");
const { verifyAccessToken } = require("../../../../modules/functions");
const { UserModel } = require("../../../../models/auth/auth.model");
const { UserPersonelModel } = require("../../../../models/users/users.model");

//Public Class
class PishbiniController extends Controller {
  async createPishbini(req, res, next) {
    try {
      const { count, child, month, formulaId, monthLabel, formulaLabel } =
        req.body;
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
        phone: verifyResult.phone,
      });
      const userPersonel = await UserPersonelModel.findOne({
        phone: verifyResult.phone,
      });
      if (!count && !child && !month && !formulaId) {
        res.status(500).json({
          status: 500,
          message: "اطلاعات ارسالی بازبینی شود",
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      } else {
        const getFormulName = await FormulaModel.findOne({ _id: formulaId });
        const yearFinancial = await FYModel.findOne({ activeYear: "active" });

        if (user) {
          const pishbiniAdd = await PishbiniToolidModel.create({
            count,
            child,
            title: getFormulName.title,
            month,
            monthLabel,
            formulaLabel,
            adminId: user._id,
            yearFinancial: yearFinancial.fyValue,
            formulaId,
          });
        }

        if (userPersonel) {
          const pishbiniAdd = await PishbiniToolidModel.create({
            count,
            child,
            title: getFormulName.title,
            month,
            monthLabel,
            adminId: userPersonel.adminUser,
            yearFinancial: yearFinancial.fyValue,
            formulaId,
            formulaLabel,
          });
        }

        res.status(200).json({
          status: 200,
          message: "پیش بینی ساخته شد",
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      }

      //   }
    } catch (err) {
      next(err);
    }
  }

  async getPishbiniByMonth(req, res, next) {
    try {
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
        phone: verifyResult.phone,
      });
      const { month } = req.body;

      if (!month) {
        res.status(500).json({
          status: 500,
          message: "اطلاعات ارسالی بازبینی شود",
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      } else {
        const dataGet = await PishbiniToolidModel.find({
          month,
          adminId: user._id.toString(),
        });
        res.status(200).json({
          status: 200,
          data: { dataGet },
          message: "داده دریافت شد",
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      }

      //   }
    } catch (err) {
      next(err);
    }
  }

  async getPishbiniByMonthFr(req, res, next) {
    try {
      const { month, formulaId } = req.body;

      if (!month && !formulaId) {
        res.status(500).json({
          status: 500,
          message: "اطلاعات ارسالی بازبینی شود",
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      } else {
        const dataGet = await PishbiniToolidModel.find({ month, formulaId });
        res.status(200).json({
          status: 200,
          data: { dataGet },
          message: "داده دریافت شد",
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      }

      //   }
    } catch (err) {
      next(err);
    }
  }

  async getPishbiniInMonth(req, res, next) {
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
        await PishbiniToolidModel.find({
          yearFinancial: getFyYear.fyValue,
          month: "1",
          adminId: DataUser,
        })
      ).length;
      const ordibehesht = (
        await PishbiniToolidModel.find({
          yearFinancial: getFyYear.fyValue,
          month: "2",
          adminId: DataUser,
        })
      ).length;
      const khordad = (
        await PishbiniToolidModel.find({
          yearFinancial: getFyYear.fyValue,
          month: "3",
          adminId: DataUser,
        })
      ).length;
      const tir = (
        await PishbiniToolidModel.find({
          yearFinancial: getFyYear.fyValue,
          month: "4",
          adminId: DataUser,
        })
      ).length;
      const mordad = (
        await PishbiniToolidModel.find({
          yearFinancial: getFyYear.fyValue,
          month: "5",
          adminId: DataUser,
        })
      ).length;
      const shahrivar = (
        await PishbiniToolidModel.find({
          yearFinancial: getFyYear.fyValue,
          month: "6",
          adminId: DataUser,
        })
      ).length;
      const mehr = (
        await PishbiniToolidModel.find({
          yearFinancial: getFyYear.fyValue,
          month: "7",
          adminId: DataUser,
        })
      ).length;
      const aban = (
        await PishbiniToolidModel.find({
          yearFinancial: getFyYear.fyValue,
          month: "8",
          adminId: DataUser,
        })
      ).length;
      const azar = (
        await PishbiniToolidModel.find({
          yearFinancial: getFyYear.fyValue,
          month: "9",
          adminId: DataUser,
        })
      ).length;
      const dey = (
        await PishbiniToolidModel.find({
          yearFinancial: getFyYear.fyValue,
          month: "10",
          adminId: DataUser,
        })
      ).length;
      const bahman = (
        await PishbiniToolidModel.find({
          yearFinancial: getFyYear.fyValue,
          month: "11",
          adminId: DataUser,
        })
      ).length;
      const esfand = (
        await PishbiniToolidModel.find({
          yearFinancial: getFyYear.fyValue,
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

  async getPishbiniCount(req, res, next) {
    try {
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
        phone: verifyResult.phone,
      });
      const data = await PishbiniToolidModel.find({
        adminId: user._id.toString(),
      }).count();
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

  async getSPishbiniall(req, res, next) {
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
            await PishbiniToolidModel.find({ adminId: user._id })
          ).reverse();
        }

        if (userPersonel) {
          dataGet = (
            await PishbiniToolidModel.find({ adminId: userPersonel.adminUser })
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

  //   async getAllFormulas(req, res, next) {
  //     try {
  //       try {
  //         const dataGet = await FormulaModel.find();
  //         res.status(200).json({
  //           status: 200,
  //           requestDate: new Date(),
  //           data: { dataGet },
  //           message: "داده ها دریافت شدند !",
  //         });
  //       } catch (error) {
  //         next(error);
  //       }
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  //   async getFormulasById(req, res, next) {
  //     try {
  //       const { _id } = req.body;
  //       try {
  //         const dataGet = await FormulaModel.find({ _id });
  //         res.status(200).json({
  //           status: 200,
  //           requestDate: new Date(),
  //           data: { dataGet },
  //           message: "داده ها دریافت شدند !",
  //         });
  //       } catch (error) {
  //         next(error);
  //       }
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  //   async getFormulaCountFromStorage(req, res, next) {
  //     try {
  //       const { _id } = req.body;
  //       console.log(_id);
  //       // const dataParsed = await JSON.parse(_id);
  //       const objectIds = _id.ids.map((id) => new Types.ObjectId(id));
  //       try {
  //         const dataGet = await ProductModel.find({ _id: { $in: objectIds } });
  //         const allDataCount = await dataGet.map((data) => ({
  //           id: data._id,
  //           count: data.mainCount,
  //         }));
  //         res.status(200).json({
  //           status: 200,
  //           requestDate: new Date(),
  //           data: { allDataCount },
  //           message: "داده ها دریافت شدند !",
  //         });
  //       } catch (error) {
  //         next(error);
  //       }
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
}
module.exports = { PishbiniController: new PishbiniController() };
