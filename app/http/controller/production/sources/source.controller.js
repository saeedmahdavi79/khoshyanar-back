const { UserModel } = require("../../../../models/auth/auth.model");
const {
  FYModel,
} = require("../../../../models/production/financialYear/fy.model");
const ProductModel = require("../../../../models/production/product/product.model");
const {
  SourceModel,
} = require("../../../../models/production/source/source.model");
const {
  SrcContentModel,
} = require("../../../../models/production/source/sourceContent/src.model");
const { UserPersonelModel } = require("../../../../models/users/users.model");

const { verifyAccessToken } = require("../../../../modules/functions");

const Controller = require("../../controller");
var shamsi = require("shamsi-date-converter");

//Public Class
class SourceController extends Controller {
  async createSource(req, res, next) {
    try {
      const { sourceName, sourceDes, vahed, dama, type, expireDate } = req.body;

      if (!sourceName && !sourceDes && !vahed && !type) {
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

          const yearFinancial = await FYModel.findOne({ activeYear: "active" });

          if (user) {
            const createLead = await SourceModel.create({
              sourceName,
              sourceDes,
              month: shamsi.gregorianToJalali(new Date())[1],
              year: shamsi.gregorianToJalali(new Date())[0],
              day: shamsi.gregorianToJalali(new Date())[2],
              vahed,
              dama,
              type,
              expireDate,
              yearFinancial: yearFinancial.fyValue,
              adminUser: user._id,
            });
          }

          if (userPersonel) {
            const createLead = await SourceModel.create({
              sourceName,
              sourceDes,
              month: shamsi.gregorianToJalali(new Date())[1],
              year: shamsi.gregorianToJalali(new Date())[0],
              day: shamsi.gregorianToJalali(new Date())[2],
              vahed,
              dama,
              type,
              expireDate,
              yearFinancial: yearFinancial.fyValue,
              adminUser: userPersonel.adminUser,
            });
          }

          res.status(202).json({
            status: 202,
            message: ` انبار : ${sourceName} ایجاد شد`,
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

  async createSourceContent(req, res, next) {
    try {
      const {
        sourceCode,
        sourceName,
        sourceDes,
        firstCount,
        entryCount,
        exportCount,
        productId,
        sourceId,
      } = req.body;

      if (
        !sourceName &&
        !sourceCode &&
        !firstCount &&
        !sourceDes &&
        !vahed &&
        !productId &&
        !sourceId &&
        !type
      ) {
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
          const yearFinancial = await FYModel.findOne({ activeYear: "active" });

          const mainCountNew =
            parseInt(firstCount) + parseInt(entryCount) - parseInt(exportCount);
          const createLead = await SrcContentModel.create({
            sourceCode,
            sourceName,
            sourceDes,
            firstCount,
            productId,
            entryCount,
            exportCount,
            month: shamsi.gregorianToJalali(new Date())[1],
            year: shamsi.gregorianToJalali(new Date())[0],
            day: shamsi.gregorianToJalali(new Date())[2],
            mainCount: mainCountNew,
            sourceId,
            yearFinancial: yearFinancial.fyValue,
            adminId: user._id,
          });

          res.status(202).json({
            status: 202,
            message: ` محتوای انبار : ${sourceName} ایجاد شد`,
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

  async getSource(req, res, next) {
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
        let dataGet =[];

        if(user){
          dataGet = (
            await SourceModel.find({ adminUser: user._id })
          ).reverse();
        }
        if(userPersonel){
          dataGet = (
            await SourceModel.find({ adminUser: userPersonel.adminUser })
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

  async getSourceUser(req, res, next) {
    try {
      try {
        const authorization = req.headers.authorization;
        const [bearer, token] = authorization.split(" ");

        const verifyResult = await verifyAccessToken(token);
        const user = await UserModel.findOne({
          phone: verifyResult.phone,
        });

        const dataGet = (
          await SourceModel.find({ adminId: user._id.toString() })
        ).reverse();

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

  async getSourceContent(req, res, next) {
    try {
      try {
        const dataGet = (await SrcContentModel.find()).reverse();

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

  async getSourceContentBySourceId(req, res, next) {
    try {
      const { sourceId } = req.body;
      try {
        const dataGet = (await ProductModel.find({ sourceId })).reverse();

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

  async getSourceByToken(req, res, next) {
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
          dataGet = (await SourceModel.find({ adminUser: user._id })).reverse();
        }

        if (userPersonel) {
          dataGet = (
            await SourceModel.find({ adminUser: userPersonel.adminUser })
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

  async getSourceById(req, res, next) {
    try {
      const { _id } = req.body;

      try {
        const dataGet = await SourceModel.find({
          _id,
        });

        res.status(202).json({
          status: 202,
          data: { dataGet },
          message: `اطلاعات دریافت شد`,
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async removeSource(req, res, next) {
    try {
      const { _id } = req.body;

      try {
        const dataGet = await SourceModel.findOneAndDelete({
          _id,
        });
        const dataGet2 = await ProductModel.deleteMany({
          sourceId: _id,
        });

        res.status(202).json({
          status: 202,

          message: `اطلاعات حذف شد`,
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

module.exports = { SourceController: new SourceController() };
