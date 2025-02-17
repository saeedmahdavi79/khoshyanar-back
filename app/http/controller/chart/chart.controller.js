const { UserModel } = require('../../../models/auth/auth.model');
const ChartModel = require('../../../models/chart/chart.model');
const Chart = require('../../../models/chart/chart.model');
const { verifyAccessToken } = require('../../../modules/functions');
const Controller = require("../controller");
var shamsi = require("shamsi-date-converter");
const { default: slugify } = require("slugify");
const createHttpError = require("http-errors");
const { isValidObjectId, Types } = require("mongoose");
const { UserPersonelModel } = require('../../../models/users/users.model');

//Public Class
class ChartController extends Controller {
    async createChart(req, res, next) {
        try {
          const { title, des, icon, slug, parent,userName,userId } = req.body;
          
          const authorization = req.headers.authorization;
          const [bearer, token] = authorization.split(" ");
    
          const verifyResult = await verifyAccessToken(token);
          const user = await UserModel.findOne({
            phone: verifyResult.phone,
          });
    
          await this.createChartApp({
            title,
            des,
            icon,
            slug,
            userName,
            userId,
            parent,
            adminUser: user._id,
            adminUserName: user.name + "" + user.lastName,
            month: shamsi.gregorianToJalali(new Date())[1],
            year: shamsi.gregorianToJalali(new Date())[0],
            day: shamsi.gregorianToJalali(new Date())[2],
          });

          res.status(200).json({
            status: 200,
            message: "چارت با موفقیت ثبت شد",
    
            createDate: new Date().toLocaleDateString("fa-ir"),
          });
        } catch (err) {
          next(err);
        }
      }
    
      async createChartApp(categoryDto) {
       
        //   categoryDto.parent = categoryDto._id;
        //   categoryDto.parents = [
        //     ...new Set(
        //       [existCategory._id.toString()]
        //         .concat(existCategory.parents.map((id) => id.toString()))
        //         .map((id) => new Types.ObjectId(id))
        //     ),
        //   ];
        
       
    
        const category = await ChartModel.create(categoryDto);
    
        return category;
      }
    
      async checkExistById(id) {
        const category = await ChartModel.findById(id);
        if (!category) throw new createHttpError.NotFound("دسته بندی یافت نشد");
        return category;
      }
    
    


      async getChart(req, res, next) {
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
      dataGet = await ChartModel.find({
        adminUser: user._id,
     
      }).populate([{ path: "children" }]);
    }
    if (userPersonel) {
      dataGet = await ChartModel.find({
        adminUser: userPersonel.adminUser,
       
      }).populate([{ path: "children" }]);
    }

    return dataGet;
  }




 
}
module.exports = { ChartController: new ChartController() };
