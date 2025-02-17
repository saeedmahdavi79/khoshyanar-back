const { UserModel } = require("../../../../../models/auth/auth.model");
const {
  FYModel,
} = require("../../../../../models/production/financialYear/fy.model");
const ProductCatModel = require("../../../../../models/production/product/category/category.model");
const ProductModel = require("../../../../../models/production/product/product.model");
const {
  SourceModel,
} = require("../../../../../models/production/source/source.model");
const {
  UserPersonelModel,
} = require("../../../../../models/users/users.model");
const { verifyAccessToken } = require("../../../../../modules/functions");
const Controller = require("../../../controller");

//Public Class
class ProductReportController extends Controller {
  async getCountOfProductByCategoryId(req, res, next) {
    try {
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
        phone: verifyResult.phone,
      });
      const { _id } = req.body;

      const dataGet = await ProductModel.find({
        productCatId: _id,
        adminId: user._id.toString(),
      }).count();

      res.status(200).json({
        status: 200,
        message: "اطلاعات دریافت شد",
        data: dataGet,
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (error) {
      next(error);
    }
  }

  async getCountOfProducts(req, res, next) {
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

      const dataGet = (
        await ProductModel.find({
          adminUser: DataUser,
        })
      ).length;

      res.status(200).json({
        status: 200,
        message: "اطلاعات دریافت شد",
        data: dataGet,
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (error) {
      next(error);
    }
  }

  async getCountOfPersonel(req, res, next) {
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

      const dataGet = (
        await UserPersonelModel.find({
          adminUser: DataUser,
        })
      ).length;

      res.status(200).json({
        status: 200,
        message: "اطلاعات دریافت شد",
        data: dataGet,
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (error) {
      next(error);
    }
  }

  async getCountOfCategory(req, res, next) {
    try {
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
        phone: verifyResult.phone,
      });
      const dataGet = await ProductCatModel.find({
        adminId: user._id.toString(),
      }).count();

      res.status(200).json({
        status: 200,
        message: "اطلاعات دریافت شد",
        data: dataGet,
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (error) {
      next(error);
    }
  }

  async getCountOfSource(req, res, next) {
    try {
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
        phone: verifyResult.phone,
      });
      const dataGet = await SourceModel.find({
        adminId: user._id.toString(),
      }).count();

      res.status(200).json({
        status: 200,
        message: "اطلاعات دریافت شد",
        data: dataGet,
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategoryByMonth(req, res, next) {
    try {
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
        phone: verifyResult.phone,
      });
      const { month } = req.body;

      const dataGet = await ProductCatModel.find({
        adminId: user._id.toString(),
        month,
      });

      res.status(200).json({
        status: 200,
        message: "اطلاعات دریافت شد",
        data: { dataGet },
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategoryByYear(req, res, next) {
    try {
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
        phone: verifyResult.phone,
      });
      const { year } = req.body;

      const dataGet = await ProductCatModel.find({
        year,
        adminId: user._id.toString(),
      });

      res.status(200).json({
        status: 200,
        message: "اطلاعات دریافت شد",
        data: { dataGet },
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategoryByYearAndMonth(req, res, next) {
    try {
      const { year, month } = req.body;
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
        phone: verifyResult.phone,
      });
      const dataGet = await ProductCatModel.find({
        year,
        month,
        adminId: user._id.toString(),
      });

      res.status(200).json({
        status: 200,
        message: "اطلاعات دریافت شد",
        data: { dataGet },
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategoryInMonth(req, res, next) {
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
        await ProductCatModel.find({
          year: getFyYear.fyValue,
          month: "1",
          adminId: DataUser,
        })
      ).length;
      const ordibehesht = (
        await ProductCatModel.find({
          year: getFyYear.fyValue,
          month: "2",
          adminId: DataUser,
        })
      ).length;
      const khordad = (
        await ProductCatModel.find({
          year: getFyYear.fyValue,
          month: "3",
          adminId: DataUser,
        })
      ).length;
      const tir = (
        await ProductCatModel.find({
          year: getFyYear.fyValue,
          month: "4",
          adminId: DataUser,
        })
      ).length;
      const mordad = (
        await ProductCatModel.find({
          year: getFyYear.fyValue,
          month: "5",
          adminId: DataUser,
        })
      ).length;
      const shahrivar = (
        await ProductCatModel.find({
          year: getFyYear.fyValue,
          month: "6",
          adminId: DataUser,
        })
      ).length;
      const mehr = (
        await ProductCatModel.find({
          year: getFyYear.fyValue,
          month: "7",
          adminId: DataUser,
        })
      ).length;
      const aban = (
        await ProductCatModel.find({
          year: getFyYear.fyValue,
          month: "8",
          adminId: DataUser,
        })
      ).length;
      const azar = (
        await ProductCatModel.find({
          year: getFyYear.fyValue,
          month: "9",
          adminId: DataUser,
        })
      ).length;
      const dey = (
        await ProductCatModel.find({
          year: getFyYear.fyValue,
          month: "10",
          adminId: DataUser,
        })
      ).length;
      const bahman = (
        await ProductCatModel.find({
          year: getFyYear.fyValue,
          month: "11",
          adminId: DataUser,
        })
      ).length;
      const esfand = (
        await ProductCatModel.find({
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
  
  async getProductInMonth(req, res, next) {
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
        DataUser = await user._id;
      }
      if (userPersonel) {
        DataUser = await userPersonel.adminUser;
      }

      const getFyYear = await FYModel.findOne({
        activeYear: "active",
        adminId: DataUser,
      });
      const farvardin = (
        await ProductModel.find({
          year: getFyYear.fyValue,
          month: "1",
          adminUser: DataUser,
        })
      ).length;
      const ordibehesht = (
        await ProductModel.find({
          year: getFyYear.fyValue,
          month: "2",
          adminUser: DataUser,
        })
      ).length;
      const khordad = (
        await ProductModel.find({
          year: getFyYear.fyValue,
          month: "3",
          adminUser: DataUser,
        })
      ).length;
      const tir = (
        await ProductModel.find({
          year: getFyYear.fyValue,
          month: "4",
          adminUser: DataUser,
        })
      ).length;
      const mordad = (
        await ProductModel.find({
          year: getFyYear.fyValue,
          month: "5",
          adminUser: DataUser,
        })
      ).length;
      const shahrivar = (
        await ProductModel.find({
          year: getFyYear.fyValue,
          month: "6",
          adminUser: DataUser,
        })
      ).length;
      const mehr = (
        await ProductModel.find({
          year: getFyYear.fyValue,
          month: "7",
          adminUser: DataUser,
        })
      ).length;
      const aban = (
        await ProductModel.find({
          year: getFyYear.fyValue,
          month: "8",
          adminUser: DataUser,
        })
      ).length;
      const azar = (
        await ProductModel.find({
          year: getFyYear.fyValue,
          month: "9",
          adminUser: DataUser,
        })
      ).length;
      const dey = (
        await ProductModel.find({
          year: getFyYear.fyValue,
          month: "10",
          adminUser: DataUser,
        })
      ).length;
      const bahman = (
        await ProductModel.find({
          year: getFyYear.fyValue,
          month: "11",
          adminUser: DataUser,
        })
      ).length;
      const esfand = (
        await ProductModel.find({
          year: getFyYear.fyValue,
          month: "12",
          adminUser: DataUser,
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

  async getProductByYearAndMonth(req, res, next) {
    try {
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
        phone: verifyResult.phone,
      });
      const { year, month } = req.body;

      const dataGet = await ProductModel.find({
        year,
        month,
        adminId: user._id.toString(),
      });

      res.status(200).json({
        status: 200,
        message: "اطلاعات دریافت شد",
        data: { dataGet },
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (error) {
      next(error);
    }
  }

  async getSourceByYearAndMonth(req, res, next) {
    try {
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
        phone: verifyResult.phone,
      });
      const { year, month } = req.body;

      const dataGet = await SourceModel.find({
        year,
        month,
        adminId: user._id.toString(),
      });

      res.status(200).json({
        status: 200,
        message: "اطلاعات دریافت شد",
        data: { dataGet },
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (error) {
      next(error);
    }
  }

  async getSourcesInMonth(req, res, next) {
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
        await SourceModel.find({
          year: getFyYear.fyValue,
          month: "1",
          adminUser: DataUser,
        })
      ).length;
      const ordibehesht = (
        await SourceModel.find({
          year: getFyYear.fyValue,
          month: "2",
          adminUser: DataUser,
        })
      ).length;
      const khordad = (
        await SourceModel.find({
          year: getFyYear.fyValue,
          month: "3",
          adminUser: DataUser,
        })
      ).length;
      const tir = (
        await SourceModel.find({
          year: getFyYear.fyValue,
          month: "4",
          adminUser: DataUser,
        })
      ).length;
      const mordad = (
        await SourceModel.find({
          year: getFyYear.fyValue,
          month: "5",
          adminUser: DataUser,
        })
      ).length;
      const shahrivar = (
        await SourceModel.find({
          year: getFyYear.fyValue,
          month: "6",
          adminUser: DataUser,
        })
      ).length;
      const mehr = (
        await SourceModel.find({
          year: getFyYear.fyValue,
          month: "7",
          adminUser: DataUser,
        })
      ).length;
      const aban = (
        await SourceModel.find({
          year: getFyYear.fyValue,
          month: "8",
          adminUser: DataUser,
        })
      ).length;
      const azar = (
        await SourceModel.find({
          year: getFyYear.fyValue,
          month: "9",
          adminUser: DataUser,
        })
      ).length;
      const dey = (
        await SourceModel.find({
          year: getFyYear.fyValue,
          month: "10",
          adminUser: DataUser,
        })
      ).length;
      const bahman = (
        await SourceModel.find({
          year: getFyYear.fyValue,
          month: "11",
          adminUser: DataUser,
        })
      ).length;
      const esfand = (
        await SourceModel.find({
          year: getFyYear.fyValue,
          month: "12",
          adminUser: DataUser,
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
}

module.exports = { ProductReportController: new ProductReportController() };
