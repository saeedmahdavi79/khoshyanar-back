const { Types } = require("mongoose");
const { UserModel } = require("../../../models/auth/auth.model");
const { LeaveModel } = require("../../../models/leave/leave.model");
const { LetterModel } = require("../../../models/letter/letter.model");
const {
  ZonkanModel,
} = require("../../../models/letterZonkan/letterZonkan.model");
const { UserPersonelModel } = require("../../../models/users/users.model");
const { verifyAccessToken } = require("../../../modules/functions");
const { sha256pass } = require("../../../utils/access");
const Controller = require("../controller");
var shamsi = require("shamsi-date-converter");
const axios = require("axios");
const { baseUrl } = require("../../../utils/baseUrl");
const { body } = require("express-validator");

//Public Class
class OfficeController extends Controller {
  async createLeave(req, res, next) {
    try {
      const { length, des, type } = req.body;

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
          const createLeave = await LeaveModel.create({
            requesterName: user.name + " " + user.lastName,
            date: new Date().toLocaleDateString("fa-ir"),
            length,
            des,
            type,
            requesterId: user._id,
            adminUser: user._id,
          });
        }

        if (userPersonel) {
          const createLeave = await LeaveModel.create({
            requesterName: userPersonel.name + " " + userPersonel.lastName,
            date: new Date().toLocaleDateString("fa-ir"),
            length,
            des,
            type,
            requesterId: userPersonel._id,
            adminUser: userPersonel.adminUser,
          });
        }

        res.status(202).json({
          status: 202,
          message: ` درخواست مرخصی ثبت شد`,
          createDate: new Date(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async getLeaveAdmin(req, res, next) {
    try {
      try {
        const authorization = req.headers.authorization;
        const [bearer, token] = authorization.split(" ");

        const verifyResult = await verifyAccessToken(token);
        const user = await UserModel.findOne({
          phone: verifyResult.phone,
        });

        const createLeave = await LeaveModel.find({
          adminUser: user.adminId,
        });

        res.status(202).json({
          status: 202,
          message: ` درخواست مرخصی دریافت شد`,
          createDate: new Date(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async createSign(req, res, next) {
    try {
      const { signStatus, _id } = req.body;

      try {
        const authorization = req.headers.authorization;
        const [bearer, token] = authorization.split(" ");

        const verifyResult = await verifyAccessToken(token);
        const user = await UserModel.findOne({
          phone: verifyResult.phone,
        });

        const getRandomInteger = (min, max) => {
          min = Math.ceil(min);
          max = Math.floor(max);

          return Math.floor(Math.random() * (max - min)) + min;
        };

        const signCode = getRandomInteger(10000, 99999);

        if (user) {
          const createLeave = await UserPersonelModel.findOneAndUpdate(
            { _id },
            {
              signCode,
              signStatus,
            }
          );
        }

        res.status(202).json({
          status: 202,
          message: ` درخواست حق امضا ثبت شد`,
          createDate: new Date(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  // async removeSign(req, res, next) {
  //   try {
  //     const { signStatus, _id } = req.body;

  //     try {
  //       const authorization = req.headers.authorization;
  //       const [bearer, token] = authorization.split(" ");

  //       const verifyResult = await verifyAccessToken(token);
  //       const user = await UserModel.findOne({
  //         phone: verifyResult.phone,
  //       });

  //       const getRandomInteger = (min, max) => {
  //         min = Math.ceil(min);
  //         max = Math.floor(max);

  //         return Math.floor(Math.random() * (max - min)) + min;
  //       };

  //       const signCode = getRandomInteger(10000, 99999);

  //       if (user) {
  //         const createLeave = await UserPersonelModel.findOneAndUpdate(
  //           { _id },
  //           {
  //             signCode,
  //             signStatus,
  //           }
  //         );
  //       }

  //       res.status(202).json({
  //         status: 202,
  //         message: ` درخواست حق امضا ثبت شد`,
  //         createDate: new Date(),
  //       });
  //     } catch (error) {
  //       next(error);
  //     }
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  async getLeaveRequester(req, res, next) {
    try {
      try {
        const authorization = req.headers.authorization;
        const [bearer, token] = authorization.split(" ");

        const verifyResult = await verifyAccessToken(token);
        const user = await UserModel.findOne({
          phone: verifyResult.phone,
        });

        const createLeave = await LeaveModel.find({
          requesterId: user._id,
        });

        res.status(202).json({
          status: 202,
          message: ` درخواست مرخصی دریافت شد`,
          createDate: new Date(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async getLeaves(req, res, next) {
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
            await LeaveModel.find({
              adminUser: user._id,
            })
          ).reverse();
        }
        if (userPersonel) {
          dataGet = (
            await LeaveModel.find({
              adminUser: userPersonel.adminUser,
              requesterId: userPersonel._id,
            })
          ).reverse();
        }

        res.status(202).json({
          status: 202,
          data: { dataGet },
          message: ` درخواست مرخصی دریافت شد`,
          createDate: new Date(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async leaveAdminConfirm(req, res, next) {
    try {
      const { _id } = req.body;
      try {
        const dataConf = await LeaveModel.findOneAndUpdate(
          {
            _id,
          },
          {
            status: "true",
          }
        );

        res.status(202).json({
          status: 202,
          message: "اطلاعات بروز شد",

          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async createPersonel(req, res, next) {
    try {
      const {
        sex,
        name,
        lastName,
        userName,
        password,
        phone,
        birth,
        email,
        type,
        role,
        access,
      } = req.body;

      try {
        const authorization = req.headers.authorization;
        const [bearer, token] = authorization.split(" ");

        const verifyResult = await verifyAccessToken(token);
        const user = await UserModel.findOne({
          phone: verifyResult.phone,
        });

        const findUserName = await UserPersonelModel.findOne({
          userName,
        });
        const findPhone = await UserPersonelModel.findOne({
          phone,
        });
        const hashedPassword = await sha256pass(password);

        if (findUserName) {
          res.status(500).json({
            status: 500,
            message: `نام کاربری از قبل موجود است`,
            createDate: new Date(),
          });
        } else {
          if (findPhone) {
            res.status(500).json({
              status: 500,
              message: `نام کاربری از قبل موجود است`,
              createDate: new Date(),
            });
          } else {
            const createPersonel = await UserPersonelModel.create({
              sex,
              name,
              lastName,
              userName,
              password: hashedPassword,
              phone,
              birth,
              email,
              type,
              role,
              access,
              activePlan: user.activePlan,
              activePlanName: user.activePlanName,
              activePlanLenght: user.activePlanLenght,
              activePlanExpireTime: user.activePlanExpireTime,
              adminUser: user._id,
              adminUserName: user.name + " " + user.lastName,
            });
            res.status(202).json({
              status: 202,
              message: `پرسنل ثبت شد`,
              createDate: new Date(),
            });
          }
        }
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async editPersonel(req, res, next) {
    try {
      const {
        sex,
        name,
        lastName,
        userName,
        phone,
        birth,
        email,
        type,
        _id,
        access,
        password,
      } = req.body;

      try {
        const hashedPassword = await sha256pass(password);

        const editPersonel = await UserPersonelModel.findOneAndUpdate(
          {
            _id,
          },
          {
            sex,
            name,
            lastName,
            userName,
            phone,
            birth,
            email,
            type,
            access,
            password: hashedPassword,
          }
        );
        res.status(200).json({
          status: 200,
          message: `پرسنل ویرایش شد`,
          createDate: new Date(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async getPersonels(req, res, next) {
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
          dataGet = await UserPersonelModel.find({
            adminUser: user._id,
          });
        }

        if (userPersonel) {
          dataGet = await UserPersonelModel.find({
            adminUser: userPersonel.adminUser,
          });
        }

        // console.log(getResponseData);

        //   const responseToken = await axios.post(baseUrl("/TokenAuth/Authenticate"), {
        //     // داده‌هایی که برای درخواست به API اول نیاز دارید
        //     headers: {
        //      "Content-Type": "application/json", // اضافه کردن توکن به هدر
        //   },
        //     body: {
        //       "userNameOrEmailAddress": "admin",
        //       "password": "123qwe",
        //       "twoFactorVerificationCode": "string",
        //       "rememberClient": true,
        //       "twoFactorRememberClientToken": "string",
        //       "singleSignIn": true,
        //       "returnUrl": "string",
        //       "captchaResponse": "string"
        //     }
        // });

        // const token = responseToken.data.result.accessToken; // فرض بر این است که توکن در اینجا دریافت می‌شود

        // // مرحله دوم: درخواست به API دوم با استفاده از توکن در هدر
        // const responseData = await axios.get(baseUrl("/service/Base/ApiService/GetPersennels"), {
        //     headers: {
        //         Authorization: `Bearer ${token}`, // اضافه کردن توکن به هدر
        //     "Abp.TenantId" :"1"
        //       }
        // });

        res.status(202).json({
          status: 202,
          data: { dataGet },
          message: ` کاربران دریافت شد`,
          createDate: new Date(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async getPersonelsChat(req, res, next) {
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

        const dataGet1 = (
          await UserPersonelModel.find({
            adminUser: !user ? userPersonel.adminUser : user._id,
          })
        ).reverse();
        const dataGet2 = (
          await UserModel.find({
            _id: !user ? userPersonel.adminUser : user._id,
          })
        ).reverse();

        const dataGet = [...dataGet1, ...dataGet2];
        res.status(202).json({
          status: 202,
          data: { dataGet },
          message: ` کاربران دریافت شد`,
          createDate: new Date(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async removePersonels(req, res, next) {
    try {
      try {
        const { _id } = req.body;

        const dataRemove = await UserPersonelModel.findOneAndDelete({
          _id,
        });

        res.status(200).json({
          status: 200,
          message: ` کاربر حذف شد`,
          createDate: new Date(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async createZonkan(req, res, next) {
    try {
      const { zonkanName, des } = req.body;

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
          const createZonkan = await ZonkanModel.create({
            zonkanName,
            des,
            adminUser: user._id,
            adminUserName: user.name + " " + user.lastName,
          });
        }
        if (userPersonel) {
          const createZonkan = await ZonkanModel.create({
            zonkanName,
            des,
            adminUser: userPersonel.adminUser,
            adminUserName: user.name + " " + user.lastName,
          });
        }

        res.status(202).json({
          status: 202,
          message: `زونکن ثبت شد`,
          createDate: new Date(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async getZonkan(req, res, next) {
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

        // If userPersonel exists, fetch data using userPersonel.adminUser
        const dataGet = (
          await ZonkanModel.find({
            adminUser: !user ? userPersonel.adminUser : user._id,
          })
        ).reverse();

        // Merge the results
        const mergedData = [...dataGet];

        res.status(202).json({
          status: 202,
          data: { mergedData },
          message: ` زونکن ها دریافت شد`,
          createDate: new Date(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async editZonkan(req, res, next) {
    try {
      const { _id, zonkanName, des } = req.body;

      try {
        const editPersonel = await UserPersonelModel.findOneAndUpdate(
          {
            _id,
          },
          {
            zonkanName,
            des,
          }
        );
        res.status(200).json({
          status: 200,
          message: `زونکن ویرایش شد`,
          createDate: new Date(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async removeZonkan(req, res, next) {
    try {
      try {
        const { _id } = req.body;

        const dataRemove = await ZonkanModel.findOneAndDelete({
          _id,
        });

        res.status(200).json({
          status: 200,
          message: ` کاربر حذف شد`,
          createDate: new Date(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async createLetter(req, res, next) {
    try {
      const { subject, zonkan, recivers, doc, content } = req.body;

      try {
        const authorization = req.headers.authorization;
        const [bearer, token] = authorization.split(" ");

        const verifyResult = await verifyAccessToken(token);
        const user = await UserModel.findOne({
          phone: verifyResult.phone,
        });

        const getRandomInteger = (min, max) => {
          min = Math.ceil(min);
          max = Math.floor(max);

          return Math.floor(Math.random() * (max - min)) + min;
        };

        const randId = getRandomInteger(10000, 99999);

        const createLetter = await LetterModel.create({
          subject,
          zonkan,
          recivers,
          doc,
          number: randId,
          month: shamsi.gregorianToJalali(new Date())[1],
          year: shamsi.gregorianToJalali(new Date())[0],
          day: shamsi.gregorianToJalali(new Date())[2],
          content,
          adminUser: user._id,
          adminUserName: user.name + " " + user.lastName,
        });
        res.status(202).json({
          status: 202,
          message: `نامه ثبت شد`,
          createDate: new Date(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async getLetters(req, res, next) {
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

        // Initialize arrays for data
        let dataGet = [];
        let dataGet2 = [];
        let filteredData = [];
        // Check if user exists
        if (user) {
          // If user exists, fetch data using user._id
          dataGet = (
            await LetterModel.find({
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

          function filterByReceiverId(dataArray, receiverId) {
            return dataArray.filter((item) =>
              item.recivers.some((id) => id === receiverId)
            );
          }

          filteredData = filterByReceiverId(
            dataGet2,
            userPersonel._id.toString()
          );
        }

        // Merge the results
        const mergedData = [...dataGet, ...filteredData];

        // Send response
        res.status(202).json({
          status: 202,
          data: { mergedData },
          message: ` زونکن ها دریافت شد`,
          createDate: new Date(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async letterAdminConfirm(req, res, next) {
    try {
      const { _id } = req.body;
      try {
        const dataConf = await LetterModel.findOneAndUpdate(
          {
            _id,
          },
          {
            status: "true",
          }
        );

        res.status(202).json({
          status: 202,
          message: "اطلاعات بروز شد",

          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async removeLetter(req, res, next) {
    try {
      try {
        const { _id } = req.body;

        const dataRemove = await LetterModel.findOneAndDelete({
          _id,
        });

        res.status(200).json({
          status: 200,
          message: ` نامه حذف شد`,
          createDate: new Date(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  //org chart

  async createChart(req, res, next) {
    try {
      const { title, actor, icon, slug, parent } = req.body;
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
          actor,
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
          actor,
          icon,
          slug,
          adminId: userPersonel.adminUser,
          month: shamsi.gregorianToJalali(new Date())[1],
          year: shamsi.gregorianToJalali(new Date())[0],
          day: shamsi.gregorianToJalali(new Date())[2],
          parent,
        };
      }

      await this.createChartData(dataCreate);
      res.status(200).json({
        status: 200,
        message: "چارت با موفقیت ثبت شد",

        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (err) {
      next(err);
    }
  }

  async createChartData(categoryDto) {
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
      // await this.alreadyExistBySlug(categoryDto.slug);
    } else {
      categoryDto.slug = slugify(categoryDto.title);
    }

    const category = await OrganizitonChartModel.create(categoryDto);

    return category;
  }

  async checkExistById(id) {
    const category = await OrganizitonChartModel.findById(id);
    if (!category) throw new createHttpError.NotFound("دسته بندی یافت نشد");
    return category;
  }

  async checkExistBySlug(slug) {
    const category = await OrganizitonChartModel.findOne({ slug });
    if (!category) throw new createHttpError.NotFound("دسته بندی یافت نشد");
    return category;
  }

  async alreadyExistBySlug(slug) {
    const category = await OrganizitonChartModel.findOne({ slug });
    if (category) throw new createHttpError.Conflict("دسته بندی یافت نشد");
    return null;
  }

  async getAllCharts(req, res, next) {
    try {
      try {
        const dataGet = await this.findChart(req);

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

  async getAllChartsForUser(req, res, next) {
    try {
      try {
        const dataGet = await this.findChart(req);

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

  async findChart(req) {
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
      dataGet = await OrganizitonChartModel.find({
        adminId: user._id,
        parent: { $exists: false },
      }).populate([{ path: "children" }]);
    }
    if (userPersonel) {
      dataGet = await OrganizitonChartModel.find({
        adminId: userPersonel.adminUser,
        parent: { $exists: false },
      }).populate([{ path: "children" }]);
    }

    return dataGet;
  }

  async getCountOfCharts(req, res, next) {
    try {
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
        phone: verifyResult.phone,
      });
      const dataGet = await OrganizitonChartModel.find({
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

  async deleteChart(req, res, next) {
    try {
      const { _id } = req.body;

      try {
        const dataGet = await OrganizitonChartModel.findOneAndDelete({ _id });

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
module.exports = { OfficeController: new OfficeController() };
