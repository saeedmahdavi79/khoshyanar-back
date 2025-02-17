const { UserModel } = require("../../../models/auth/auth.model");
const { OrderModel } = require("../../../models/order/orders.model");
const { PlansModel } = require("../../../models/plans/plan.model");
const { verifyAccessToken } = require("../../../modules/functions");
const Controller = require("../controller");
var shamsi = require("shamsi-date-converter");

//Public Class
class PlanController extends Controller {
  async createPlan(req, res, next) {
    try {
      const {
        planName,
        planDetails,
        planPrice,
        planStatus,
        planDiscount,
        planLenght,
        planProfit,
      } = req.body;

      if (
        !planName &&
        !planDetails &&
        !planPrice &&
        !planStatus &&
        !planDiscount &&
        !planLenght &&
        !planProfit
      ) {
        res.status(500).json({
          status: 500,
          message: "اطلاعات ارسالی کامل نمی باشد ، لطفا مجدد بازبینی کنید",
          requestDate: new Date().toLocaleDateString("fa-ir"),
        });
      } else {
        try {
          const createPlan = await PlansModel.create({
            planName,
            planDetails,
            planPrice,
            planStatus,
            planDiscount,
            planLenght,
            planProfit,
            month: shamsi.gregorianToJalali(new Date())[1],
            year: shamsi.gregorianToJalali(new Date())[0],
            day: shamsi.gregorianToJalali(new Date())[2],
          });

          res.status(202).json({
            status: 202,
            message: ` پلن : ${planName} ایجاد شد`,
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

  async getAllPlans(req, res, next) {
    try {
      try {
        const dataGet = await PlansModel.find();
        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: { dataGet },
          message: "پلن ها دریافت شدند !",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async createOrder(req, res, next) {
    try {
      const { orderPrice, orderPayMethod, orderDes, orderPDR } = req.body;

      if (!orderPrice && !orderPayMethod && !orderDes && !orderUser) {
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
          const createOrder = await OrderModel.create({
            orderPrice,
            orderPayMethod,
            orderDes,
            orderPDR,
            orderUser: user._id,
            orderStatus: "منتظر پرداخت",
            month: shamsi.gregorianToJalali(new Date())[1],
            year: shamsi.gregorianToJalali(new Date())[0],
            day: shamsi.gregorianToJalali(new Date())[2],
          });

          res.status(202).json({
            status: 202,
            orderId: createOrder._id,
            message: "سفارش با موفقیت ساخته شد",
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

  async addPlanToUser(req, res, next) {
    try {
      const { userId, planId } = req.body;
      try {
        const findPlan = await PlansModel.findOne({ _id: planId });

        const dataGet = await UserModel.findOneAndUpdate(
          { _id: userId },
          {
            activePlan: findPlan._id,
            activePlanName: findPlan.planName,
            activePlanLenght: findPlan.planLenght,
            activePlanExpireTime:
              parseInt(findPlan.planLenght) + new Date().getTime(),
          }
        );
        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: { dataGet },
          message: "پلن ها دریافت شدند !",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async payOrder(req, res, next) {
    try {
      const { orderId } = req.body;

      if (!orderId) {
        res.status(500).json({
          status: 500,
          message: "اطلاعات ارسالی کامل نمی باشد ، لطفا مجدد بازبینی کنید",
          requestDate: new Date().toLocaleDateString("fa-ir"),
        });
      } else {
        try {
          const getOrder = await OrderModel.findOne({ _id: orderId });

          const getData = await fetch("https://gateway.zibal.ir/v1/request", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              merchant: "66f15ca16f3803001a9a2c5b",
              amount: parseInt(getOrder.orderPrice),
              orderId: orderId,
              callbackUrl:
                //"http://localhost:3000/dashboard/premium/payment/callback",
                "https://afracrm.pro/dashboard/premium/payment/callback",
            }),
          });
          const responseData = await getData.json();

          const updateOrder = await OrderModel.findOneAndUpdate(
            { _id: orderId },
            {
              trackId: responseData.trackId,
            }
          );

          res.status(202).json({
            status: 202,
            trackId: responseData.trackId,

            message: "لطفا کد رهگیری را در آدرس وبسرویس درگاه قرار دهید",
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

  async orderVerify(req, res, next) {
    try {
      const { trackId, orderId } = req.body;

      if (!trackId) {
        res.status(500).json({
          status: 500,
          message: "اطلاعات ارسالی کامل نمی باشد ، لطفا مجدد بازبینی کنید",
          requestDate: new Date().toLocaleDateString("fa-ir"),
        });
      } else {
        try {
          const getData = await fetch("https://gateway.zibal.ir/v1/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              merchant: "66f15ca16f3803001a9a2c5b",
              trackId: parseInt(trackId),
            }),
          });
          const responseData = await getData.json();

          if (responseData.result == 100) {
            const updateOrder = await OrderModel.findOneAndUpdate(
              { _id: orderId },
              {
                orderStatus: "پرداخت شده",
              }
            );
          } else {
            const updateOrder = await OrderModel.findOneAndUpdate(
              { _id: orderId },
              {
                orderStatus: "پرداخت نشده",
              }
            );
          }

          const getOrder = await OrderModel.findOne({ _id: orderId });

          res.status(202).json({
            status: responseData.result,
            message: responseData.message,
            getOrder,
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
}

module.exports = { PlanController: new PlanController() };
