const { UserModel } = require("../../../models/auth/auth.model");
const { LeadModel } = require("../../../models/lead/lead.model");
const { PagesModel } = require("../../../models/pages/pages.model");
const {
  FYModel,
} = require("../../../models/production/financialYear/fy.model");
const { VisitorModel } = require("../../../models/visitor/vistior.model");
const { verifyAccessToken } = require("../../../modules/functions");
const Controller = require("../controller");
var shamsi = require("shamsi-date-converter");

//Public Class
class AdminController extends Controller {
  async createPageData(req, res, next) {
    try {
      const {
        pageRole,
        pageTitle,
        pageDes,
        pageType,
        pageName,
        pageAddress,
        pageCanonical,
        pageOpenGrapghUrl,
        pageOpenGrapghTitle,
        pageOpenGrapghDes,
        pageOpenGrapghSiteName,
      } = req.body;

      try {
        let pageOpenGrapgh = {
          url: pageOpenGrapghUrl,
          title: pageOpenGrapghTitle,
          description: pageOpenGrapghDes,
          siteName: pageOpenGrapghSiteName,
        };

        const createPage = await PagesModel.create({
          pageRole,
          pageTitle,
          pageDes,
          pageType,
          pageName,
          pageAddress,
          pageCanonical,
          pageOpenGrapgh,
        });

        res.status(202).json({
          status: 202,
          message: `صفحه ایجاد شد`,
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async getPageDataByRole(req, res, next) {
    try {
      const { pageRole } = req.body;

      try {
        const dataGet = await PagesModel.find({
          pageRole,
        });

        res.status(202).json({
          status: 202,
          data: { dataGet },
          message: `صفحه دریافت شد`,
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  // async removeCat(req, res, next) {
  //   try {
  //     const { _id } = req.body;
  //     try {
  //       const dataFind = await CatModel.findOne({
  //         _id,
  //       });
  //       if (dataFind) {
  //         const dataGet = await UserModel.findOneAndDelete({
  //           _id,
  //         });
  //         res.status(200).json({
  //           status: 200,
  //           requestDate: new Date(),

  //           message: "Cat Removed !",
  //         });

  //         if (!dataFind) {
  //           res.status(200).json({
  //             status: 200,
  //             requestDate: new Date(),
  //             message: "Cats Not Exisist !",
  //           });
  //         }
  //       }
  //     } catch (error) {
  //       next(error);
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = { AdminController: new AdminController() };
