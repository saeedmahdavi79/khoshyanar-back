const { AdsModel } = require("../../../models/ads/ads.model");
const { UserModel } = require("../../../models/auth/auth.model");
const { TasksModel } = require("../../../models/tasks/tasks.model");
const { TasksOtherModel } = require("../../../models/tasks/tasksOther.model");
const { UserPersonelModel } = require("../../../models/users/users.model");
const { VisitorModel } = require("../../../models/visitor/vistior.model");
const { verifyAccessToken } = require("../../../modules/functions");
const Controller = require("../controller");

//Public Class
class TasksController extends Controller {
  async createTaskAdmin(req, res, next) {
    try {
      const {
        taskTitle,
        taskDate,
        taskDes,
        taskStatus,
        taskId,

        expiresIn,
        targetDate,
      } = req.body;

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

        if (user) {
          const createTask = await TasksModel.create({
            taskTitle,
            taskDate,
            taskDes,
            taskStatus,
            taskId,
            adminUser: user._id,
            expiresIn,
            targetDate,
          });
        }

        if (userPersonel) {
          const createTask = await TasksModel.create({
            taskTitle,
            taskDate,
            taskDes,
            taskStatus,
            taskId,
            adminUser: userPersonel._id,
            expiresIn,
            targetDate,
          });
        }

        res.status(202).json({
          status: 202,
          message: ` تسک : ${taskTitle} ایجاد شد`,
          createDate:
            new Date().toLocaleDateString("fa-ir") +
            "-" +
            new Date().getHours() +
            ":" +
            new Date().getMinutes() +
            ":" +
            new Date().getSeconds(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async createTaskOther(req, res, next) {
    try {
      const {
        taskTitle,
        taskDate,
        taskDes,
        taskStatus,
        taskId,
        personelUser,
        expiresIn,
        targetDate,
      } = req.body;

      try {
        const authorization = req.headers.authorization;
        const [bearer, token] = authorization.split(" ");

        const verifyResult = await verifyAccessToken(token);
        const user = await UserModel.findOne({
          phone: verifyResult.phone,
        });
        const userPersonel = await UserPersonelModel.findOne({
          _id: personelUser,
        });
        const createTask = await TasksOtherModel.create({
          taskTitle,
          taskDate,
          taskDes,
          taskStatus,
          taskId,
          adminUser: user._id,
          personelUser: userPersonel._id,
          personelUserName: userPersonel.name + " " + userPersonel.lastName,
          expiresIn,
          targetDate,
        });

        res.status(202).json({
          status: 202,
          message: ` تسک : ${taskTitle} ایجاد شد`,
          createDate:
            new Date().toLocaleDateString("fa-ir") +
            "-" +
            new Date().getHours() +
            ":" +
            new Date().getMinutes() +
            ":" +
            new Date().getSeconds(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async createTaskVisitor(req, res, next) {
    try {
      const {
        taskTitle,
        taskDate,
        taskDes,
        taskStatus,
        taskId,

        expiresIn,
        targetDate,
      } = req.body;

      try {
        const authorization = req.headers.authorization;
        const [bearer, token] = authorization.split(" ");

        const verifyResult = await verifyAccessToken(token);
        const user = await VisitorModel.findOne({
          email: verifyResult.email,
        });
        const createTask = await TasksModel.create({
          taskTitle,
          taskDate,
          taskDes,
          taskStatus,
          taskId,

          visitorUser: user._id,
          expiresIn,
          targetDate,
        });

        res.status(202).json({
          status: 202,
          message: ` تسک : ${taskTitle} ایجاد شد`,
          createDate:
            new Date().toLocaleDateString("fa-ir") +
            "-" +
            new Date().getHours() +
            ":" +
            new Date().getMinutes() +
            ":" +
            new Date().getSeconds(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async getAllTasksOfOther(req, res, next) {
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
        let dataGet2 = [];

        if (user) {
          // If user exists, fetch data using user._id
          dataGet = (
            await TasksModel.find({
              adminUser: user._id,
            })
          ).reverse();
        }

        // Check if userPersonel exists
        if (userPersonel) {
          // If userPersonel exists, fetch data using userPersonel.adminUser
          dataGet2 = (
            await LetterModel.find({
              adminUser: userPersonel.adminUser,
            })
          ).reverse();
        }

        const mergedData = [...dataGet, ...dataGet2];

        res.status(200).json({
          status: 200,
          requestDate: new Date().toLocaleDateString("fa-ir"),
          data: { mergedData },
          message: "تسک ها دریافت شدند !",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getAllTasksOfVisitor(req, res, next) {
    try {
      try {
        const authorization = req.headers.authorization;
        const [bearer, token] = authorization.split(" ");

        const verifyResult = await verifyAccessToken(token);
        const user = await VisitorModel.findOne({
          email: verifyResult.email,
        });

        const dataGet = (
          await TasksModel.find({ visitorUser: user._id })
        ).reverse();
        res.status(200).json({
          status: 200,
          requestDate: new Date().toLocaleDateString("fa-ir"),
          data: { dataGet },
          message: "تسک ها دریافت شدند !",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getAllTasksOfAdmin(req, res, next) {
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
        let dataGet2 = [];
        let dataGet3 = [];
        let dataGet4 = [];

        if (user) {
          dataGet = (await TasksModel.find({ adminUser: user._id })).reverse();
          dataGet4 = (
            await TasksOtherModel.find({
              adminUser: user._id,
            })
          ).reverse();
        }

        if (userPersonel) {
          dataGet2 = (
            await TasksOtherModel.find({
              personelUser: userPersonel._id,
            })
          ).reverse();
          dataGet3 = (
            await TasksModel.find({ adminUser: userPersonel._id })
          ).reverse();
        }
        const mergedData = [...dataGet, ...dataGet2, ...dataGet3, ...dataGet4];

        res.status(200).json({
          status: 200,
          requestDate: new Date().toLocaleDateString("fa-ir"),
          data: { mergedData },
          message: "تسک ها دریافت شدند !",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getTaskByIdAdmin(req, res, next) {
    try {
      try {
        const { _id } = req.body;
        const dataGet = await TasksModel.find({ _id });
        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: { dataGet },
          message: "تسک ها دریافت شد",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getTaskByIdVisitor(req, res, next) {
    try {
      try {
        const { _id } = req.body;
        const dataGet = await TasksModel.find({ _id });
        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: { dataGet },
          message: "تسک ها دریافت شد",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async changeStatus(req, res, next) {
    try {
      const { _id, taskId, taskStatus } = req.body;

      try {
        const findData = await TasksModel.findOne({ _id });

        if (!findData) {
          res.status(404).json({
            message: "تسکی یافت نشد!",
            status: 404,
            reqDate: new Date().toLocaleDateString("fa-ir"),
          });
        } else {
          const updateData = await TasksModel.findOneAndUpdate(
            { _id },
            {
              taskId,
              taskStatus,
            }
          );
          res.status(202).json({
            message: "تسک بروز شد!",
            status: 202,
            reqDate: new Date().toLocaleDateString("fa-ir"),
          });
        }
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async removeTask(req, res, next) {
    try {
      const { _id } = req.body;
      try {
        const dataFind = await TasksModel.findOne({
          _id,
        });
        if (dataFind) {
          const dataGet = await TasksModel.findOneAndDelete({
            _id,
          });
          res.status(200).json({
            status: 200,
            requestDate: new Date(),

            message: "Task Removed !",
          });

          if (!dataFind) {
            res.status(200).json({
              status: 200,
              requestDate: new Date(),
              message: "Task Not Exisist !",
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
module.exports = { TasksController: new TasksController() };
