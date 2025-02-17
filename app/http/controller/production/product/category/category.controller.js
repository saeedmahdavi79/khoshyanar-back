const { isValidObjectId, Types } = require("mongoose");
const Controller = require("../../../controller");
const ProductCatModel = require("../../../../../models/production/product/category/category.model");
const createHttpError = require("http-errors");
const { default: slugify } = require("slugify");
var shamsi = require("shamsi-date-converter");
const { verifyAccessToken } = require("../../../../../modules/functions");
const { UserModel } = require("../../../../../models/auth/auth.model");
const {
  UserPersonelModel,
} = require("../../../../../models/users/users.model");

//Public Class
class ProductCatController extends Controller {
  async createProductCat(req, res, next) {
    try {
      const { title, des, icon, slug, parent } = req.body;
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
        phone: verifyResult.phone,
      });

      const userPersonel = await UserPersonelModel.findOne({
        phone: verifyResult.phone,
      });

      let dataCreate;

      if (user) {
        dataCreate = {
          title,
          des,
          icon,
          slug,
          adminId: user._id,
          month: shamsi.gregorianToJalali(new Date())[1],
          year: shamsi.gregorianToJalali(new Date())[0],
          day: shamsi.gregorianToJalali(new Date())[2],
          parent,
        };
      }
      if (userPersonel) {
        dataCreate = {
          title,
          des,
          icon,
          slug,
          adminId: userPersonel.adminUser,
          month: shamsi.gregorianToJalali(new Date())[1],
          year: shamsi.gregorianToJalali(new Date())[0],
          day: shamsi.gregorianToJalali(new Date())[2],
          parent,
        };
      }

      await this.createCat(dataCreate);
      res.status(200).json({
        status: 200,
        message: "دسته بندی با موفقیت ثبت شد",

        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (err) {
      next(err);
    }
  }

  async createCat(categoryDto) {
    if (categoryDto?.parent && isValidObjectId(categoryDto.parent)) {
      const existCategory = await this.checkExistById(categoryDto.parent);
      categoryDto.parent = existCategory._id;
      categoryDto.parents = [
        ...new Set(
          [existCategory._id.toString()]
            .concat(existCategory.parents.map((id) => id.toString()))
            .map((id) => new Types.ObjectId(id))
        ),
      ];
    }
    if (categoryDto?.slug) {
      categoryDto.slug = slugify(categoryDto.slug);
      await this.alreadyExistBySlug(categoryDto.slug);
    } else {
      categoryDto.slug = slugify(categoryDto.title);
    }

    const category = await ProductCatModel.create(categoryDto);

    return category;
  }

  async checkExistById(id) {
    const category = await ProductCatModel.findById(id);
    if (!category) throw new createHttpError.NotFound("دسته بندی یافت نشد");
    return category;
  }

  async checkExistBySlug(slug) {
    const category = await ProductCatModel.findOne({ slug });
    if (!category) throw new createHttpError.NotFound("دسته بندی یافت نشد");
    return category;
  }

  async alreadyExistBySlug(slug) {
    const category = await ProductCatModel.findOne({ slug });
    if (category) throw new createHttpError.Conflict("دسته بندی یافت نشد");
    return null;
  }

  async getAll(req, res, next) {
    try {
      try {
        const dataGet = await this.find(req);

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

  async getAllForUser(req, res, next) {
    try {
      try {
        const dataGet = await this.find(req);

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

  async find(req) {
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
      dataGet = await ProductCatModel.find({
        adminId: user._id,
        parent: { $exists: false },
      }).populate([{ path: "children" }]);
    }
    if (userPersonel) {
      dataGet = await ProductCatModel.find({
        adminId: userPersonel.adminUser,
        parent: { $exists: false },
      }).populate([{ path: "children" }]);
    }

    return dataGet;
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

  async deleteCat(req, res, next) {
    try {
      const { _id } = req.body;

      try {
        const dataGet = await ProductCatModel.findOneAndDelete({ _id });

        res.status(200).json({
          status: 200,
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

module.exports = { ProductCatController: new ProductCatController() };
