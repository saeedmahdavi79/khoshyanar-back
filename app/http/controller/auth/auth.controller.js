const { UserModel } = require("../../../models/auth/auth.model");
const { CustomersModel } = require("../../../models/customers/customers.model");
const { ChatModel } = require("../../../models/messenger/chat.model");
const { NotifModel } = require("../../../models/notfication/notfication.model");
const {
  FYModel,
} = require("../../../models/production/financialYear/fy.model");
const { SettingModel } = require("../../../models/settings/settings.model");
const { UserPersonelModel } = require("../../../models/users/users.model");
const {
  SignAccessToken,
  SignRefreshToken,
  verifyAccessToken,
  SignAccessTokenCustomer,
} = require("../../../modules/functions");
const { sha256pass } = require("../../../utils/access");
const { baseUrl } = require("../../../utils/baseUrl");

const Controller = require("../controller");
var shamsi = require("shamsi-date-converter");

//Public Class
class UserController extends Controller {
  async createUser(req, res, next) {
    try {
      const { email, password, phone, name, lastName, type, company } =
        req.body;
      const existedUser = await UserModel.findOne({
        email: email,
        phone: phone,
      });
      const hashedPassword = await sha256pass(password);

      const dateMili = new Date().getTime();

      if (!existedUser) {
        if (!email && !phone) {
          res.status(400).json({
            status: 400,
            message: "ایمیل یا شماره تلفن صحیح نیست !",
            requsetDate: new Date(),
          });
        } else {
          try {
            const getRandomInteger = (min, max) => {
              min = Math.ceil(min);
              max = Math.floor(max);

              return Math.floor(Math.random() * (max - min)) + min;
            };

            const signCode = getRandomInteger(10000, 99999);

            const createNewUser = await UserModel.create({
              email,
              password: hashedPassword,
              phone,
              company,
              name,
              lastName,
              type,
              signCode,
              access: "1",
              activePlan: "1",
              activePlanLenght: 604800000,
              activePlanExpireTime: dateMili + 604800000,
              activePlanName: "آزمایشی هفت روزه",
            });

            const settingAdd = await SettingModel.create({
              sellerName: "",
              bussinessNumber: "",
              sabtNmuber: "",
              nationalCode: "",
              postalCode: "",
              fax: "",
              address: "",
              phone: "",
              logoImage: "",
              wordpressApi: "",
              wordpressConsumer: "",
              wordpressSecret: "",
              sepidarApi: "",
              sepidarToken: "",
              farazSmsApi: "",
              farazSmsPattern: "",
              farazSmsUser: "",
              farazSmsPass: "",
              adminUser: createNewUser._id,
            });

            const createFinancialYear = await FYModel.create({
              fyName:
                "سال مالی : " + " " + shamsi.gregorianToJalali(new Date())[0],
              fyDes:
                "سال مالی : " + " " + shamsi.gregorianToJalali(new Date())[0],
              fyValue: shamsi.gregorianToJalali(new Date())[0],
              adminId: createNewUser._id,
              activeYear: "active",
            });

            res.status(202).json({
              status: 202,
              message: ` User : ${email} created`,
              createDate: new Date(),
            });
          } catch (error) {
            next(error);
          }
        }
      } else {
        res.status(500).json({
          status: 500,
          message: " کاربر با این مشخصات موجود است !",
          requsetDate: new Date(),
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async addPackageToUser(req, res, next) {
    try {
      const { phone, packageid } = req.body;

      if (!phone) {
        res.status(400).json({
          status: 400,
          message: "شماره تلفن درست نیست",
          requsetDate: new Date(),
        });
      } else {
        if (!packageid) {
          res.status(400).json({
            status: 400,
            message: "پکیج در دسترس نیست",
            requsetDate: new Date(),
          });
        } else {
          const findUserPackage = await UserModel.findOne({ phone });

          if (!findUserPackage) {
            const addPackage = await UserModel.findOneAndUpdate(
              { phone },
              { activePackage: packageid }
            );
            res.status(200).json({
              status: 200,
              message: "پکیج مورد نظر برای کاربر فعال شد",
              requsetDate: new Date(),
            });
          } else {
            res.status(400).json({
              status: 400,
              message: "کاربر پکیج فعال دارد",
              requsetDate: new Date(),
            });
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const hashedPassword = await sha256pass(password);
      const user = await UserModel.findOne({ email, password: hashedPassword });
      const userPersonel = await UserPersonelModel.findOne({
        userName: email,
        password: hashedPassword,
      });

      const userCustomer = await CustomersModel.findOne({
        userName: email,
        password: password,
      });

      // if (!user || !userPersonel || !userCustomer) {
      //   return res.status(404).json({
      //     status: 404,
      //     message: "Username or password was incorrect !",
      //     requestDate: new Date(),
      //   });
      // }

      // if (!user) {
      //   return res.status(404).json({
      //     status: 404,
      //     message: "Username or password was incorrect !",
      //     requestDate: new Date(),
      //   });
      // }

      const fetchToken = await fetch(baseUrl("/TokenAuth/Authenticate"), {
        method: "POST",

        headers: {
          "Content-Type": "application/json-patch+json",
          "Abp.TenantId": "1",
        },
        body: JSON.stringify({
          userNameOrEmailAddress: "admin",
          password: "123qwe",
          twoFactorVerificationCode: "string",
          rememberClient: true,
          twoFactorRememberClientToken: "string",
          singleSignIn: true,
          returnUrl: "string",
          captchaResponse: "string",
        }),
      });

      const getResponse = await fetchToken.json();

      if (user) {
        const accessToken = await SignAccessToken(user._id);
        const refreshToken = await SignRefreshToken(user._id);

        return res.status(200).json({
          status: 200,
          accessToken,
          refreshToken,
          accessTakroToken: getResponse.result.accessToken,
          role: "admin",
          message: "Login was successfull !",
          requestDate: new Date().toLocaleDateString("fa-ir"),
        });
      }
      if (userPersonel) {
        const accessToken = await SignAccessToken(userPersonel._id);
        const refreshToken = await SignRefreshToken(userPersonel._id);

        return res.status(200).json({
          status: 200,
          accessToken,
          refreshToken,
          accessTakroToken: getResponse.result.accessToken,
          role: "user",
          message: "Login was successfull !",
          requestDate: new Date().toLocaleDateString("fa-ir"),
        });
      }
      if (userCustomer) {
        const accessToken = await SignAccessTokenCustomer(userCustomer._id);
        const refreshToken = await SignAccessTokenCustomer(userCustomer._id);

        return res.status(200).json({
          status: 200,
          accessToken,
          refreshToken,
          accessTakroToken: getResponse.result.accessToken,
          role: "7",
          message: "Login was successfull !",
          requestDate: new Date().toLocaleDateString("fa-ir"),
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async signCodeChecker(req, res, next) {
    try {
      const { signCode } = req.body;

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
        const dataCompare = await UserModel.findOne({ _id: user._id });

        if (dataCompare.signCode == signCode) {
          return res.status(200).json({
            status: 200,
            thatsOp: false,
            message: "صاحب امضا و کد احراز شد",
            requestDate: new Date().toLocaleDateString("fa-ir"),
          });
        } else {
          return res.status(404).json({
            status: 404,

            message: "صاحب امضا و کد احراز نشد",
            requestDate: new Date().toLocaleDateString("fa-ir"),
          });
        }
      }

      if (userPersonel) {
        if (userPersonel.access == "1") {
          const dataCompare = await UserModel.findOne({
            _id: userPersonel.adminUser,
          });

          if (dataCompare.signCode == signCode) {
            return res.status(200).json({
              status: 200,
              thatsOp: false,
              message: "صاحب امضا و کد احراز شد",
              requestDate: new Date().toLocaleDateString("fa-ir"),
            });
          } else {
            return res.status(404).json({
              status: 404,

              message: "صاحب امضا و کد احراز نشد",
              requestDate: new Date().toLocaleDateString("fa-ir"),
            });
          }
        } else {
          // const dataCompare = await UserPersonelModel.findOne({
          //   _id: userPersonel._id,
          // });

          if (userPersonel.signStatus == "1") {
            if (userPersonel.signCode == signCode) {
              return res.status(200).json({
                status: 200,
                thatsOp: true,
                message: "صاحب امضا و کد احراز شد",
                requestDate: new Date().toLocaleDateString("fa-ir"),
              });
            } else {
              return res.status(404).json({
                status: 404,

                message: "صاحب امضا و کد احراز نشد",
                requestDate: new Date().toLocaleDateString("fa-ir"),
              });
            }
          } else {
            return res.status(404).json({
              status: 404,

              message: "صاحب امضا و کد احراز نشد",
              requestDate: new Date().toLocaleDateString("fa-ir"),
            });
          }

          // return res.status(404).json({
          //   status: 404,

          //   message: "صاحب امضا و کد احراز نشد",
          //   requestDate: new Date().toLocaleDateString("fa-ir"),
          // });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async getUserSignCode(req, res, next) {
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

      const dataGet = await UserModel.findOne({
        _id: !user ? userPersonel.adminUser : user._id,
      });

      return res.status(200).json({
        status: 200,
        data: { dataGet },
        message: "Users was successfull !",
        requestDate: new Date(),
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserSettings(req, res, next) {
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

      const userCustomer = await CustomersModel.findOne({
        _id: verifyResult.userID,
      });

      let dataGet = [];

      if (user) {
        dataGet = await SettingModel.findOne({
          adminUser: user._id,
        });
      }
      if (userPersonel) {
        dataGet = await SettingModel.findOne({
          adminUser: userPersonel.adminUser,
        });
      }
      if (userCustomer) {
        dataGet = await SettingModel.findOne({
          adminUser: userCustomer.adminUser,
        });
      }

      return res.status(200).json({
        status: 200,
        data: { dataGet },
        message: "Users was successfull !",
        requestDate: new Date(),
      });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const dataGet = await UserModel.find();

      return res.status(200).json({
        status: 200,
        data: { dataGet },
        message: "Users was successfull !",
        requestDate: new Date(),
      });
    } catch (error) {
      next(error);
    }
  }

  async getUsersDataByToken(req, res, next) {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        res.status(401).json({
          status: 401,
          message: "کاربر احراز هویت نشده است",
          requestDate: new Date().toLocaleDateString("fa-ir"),
        });
      } else {
        const [bearer, token] = authorization.split(" ");

        if (bearer && bearer.toLowerCase() == "bearer") {
          if (token) {
            const verifyResult = await verifyAccessToken(token);

            const user = await UserModel.findOne({ phone: verifyResult.phone });
            const userLast = await UserPersonelModel.findOne({
              phone: verifyResult.phone,
            });
            const userCustomer = await CustomersModel.findOne({
              _id: verifyResult.userID,
            });

            if (user) {
              res.status(200).json({
                status: 200,
                user: user,
                message: "اطلاعات کاربر دریافت شد",
                requestDate: new Date().toLocaleDateString("fa-ir"),
              });
            } else if (userLast) {
              res.status(200).json({
                status: 200,
                user: userLast,
                message: "اطلاعات کاربر دریافت شد",
                requestDate: new Date().toLocaleDateString("fa-ir"),
              });
            } else if (userCustomer) {
              res.status(200).json({
                status: 200,
                user: userCustomer,
                message: "اطلاعات کاربر دریافت شد",
                requestDate: new Date().toLocaleDateString("fa-ir"),
              });
            } else {
              res.status(401).json({
                status: 401,
                message: "کاربر احراز هویت نشده است",
                requestDate: new Date().toLocaleDateString("fa-ir"),
              });
            }

            // if (!user) {
            //   res.status(401).json({
            //     status: 401,
            //     message: "کاربر احراز هویت نشده است",
            //     requestDate: new Date().toLocaleDateString("fa-ir"),
            //   });
            // } else {
            //   res.status(200).json({
            //     status: 200,
            //     data: { user },
            //     message: "اطلاعات کاربر دریافت شد",
            //     requestDate: new Date().toLocaleDateString("fa-ir"),
            //   });
            // }

            // if (!userLast) {
            //   res.status(401).json({
            //     status: 401,
            //     message: "کاربر احراز هویت نشده است",
            //     requestDate: new Date().toLocaleDateString("fa-ir"),
            //   });
            // } else {
            //   res.status(200).json({
            //     status: 200,
            //     data: { userLast },
            //     message: "اطلاعات کاربر دریافت شد",
            //     requestDate: new Date().toLocaleDateString("fa-ir"),
            //   });
            // }
          } else {
            res.status(401).json({
              status: 401,
              message: "کاربر احراز هویت نشده است",
              requestDate: new Date().toLocaleDateString("fa-ir"),
            });
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async removeUser(req, res, next) {
    try {
      const { email } = req.body;
      try {
        const dataFind = await UserModel.findOne({
          email,
        });
        if (dataFind) {
          const dataGet = await UserModel.findOneAndDelete({
            email,
          });
          res.status(200).json({
            status: 200,
            requestDate: new Date(),

            message: "User Removed !",
          });

          if (!dataFind) {
            res.status(200).json({
              status: 200,
              requestDate:
                new Date().toLocaleDateString("fa") +
                "-" +
                new Date().getHours() +
                ":" +
                new Date().getMinutes() +
                ":" +
                new Date().getSeconds(),
              message: "User Not Exisist !",
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

  async updateSetting(req, res, next) {
    try {
      const {
        sellerName,
        bussinessNumber,
        sabtNmuber,
        nationalCode,
        postalCode,
        fax,
        address,
        phone,
        logoImage,
        wordpressApi,
        wordpressConsumer,
        wordpressSecret,
        sepidarApi,
        sepidarToken,
        farazSmsApi,
        farazSmsPattern,
        farazSmsUser,
        farazSmsPass,
      } = req.body;

      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
        phone: verifyResult.phone,
      });

      try {
        const updateSetting = await SettingModel.findOneAndUpdate(
          {
            adminUser: user._id,
          },
          {
            sellerName,
            bussinessNumber,
            sabtNmuber,
            nationalCode,
            postalCode,
            fax,
            address,
            phone,
            logoImage,
            wordpressApi,
            wordpressConsumer,
            wordpressSecret,
            sepidarApi,
            sepidarToken,
            farazSmsApi,
            farazSmsPattern,
            farazSmsUser,
            farazSmsPass,
          }
        );

        res.status(200).json({
          status: 200,
          message: "تنظیمات با موفقیت بروز شد",

          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async createNotif(req, res, next) {
    try {
      const { nameElan, contentElan } = req.body;

      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
        phone: verifyResult.phone,
      });

      const createNotif = await NotifModel.create({
        nameElan,
        contentElan,
        adminUser: user._id,
        adminUserName: user.name + " " + user.lastName,
      });

      res.status(200).json({
        status: 200,
        message: "اعلان با موفقیت اضافه شد",
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (err) {
      next(err);
    }
  }

  async getNotifs(req, res, next) {
    try {
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);

      const user = await UserModel.findOne({ phone: verifyResult.phone });
      const userLast = await UserPersonelModel.findOne({
        phone: verifyResult.phone,
      });

      let dataGet = [];

      if (user) {
        dataGet = await NotifModel.find({
          adminUser: user._id,
        });
      }
      if (userLast) {
        dataGet = await NotifModel.find({
          adminUser: userLast.adminUser,
        });
      }

      res.status(200).json({
        status: 200,
        data: { dataGet },
        message: "اعلان با موفقیت دریافت شد",
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (error) {
      next(error);
    }
  }

  async removeNotif(req, res, next) {
    try {
      const { _id } = req.body;
      try {
        const dataGet = await NotifModel.findOneAndDelete({
          _id,
        });
        res.status(200).json({
          status: 200,
          requestDate: new Date(),

          message: "User Removed !",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async createChat(req, res, next) {
    try {
      //const { message } = req.body;

      // const authorization = req.headers.authorization;
      // const [bearer, token] = authorization.split(" ");

      // const verifyResult = await verifyAccessToken(token);
      // const userPersonel = await UserPersonelModel.findOne({
      //   phone: verifyResult.phone,
      // });
      // const user = await UserModel.findOne({
      //   phone: verifyResult.phone,
      // });

      // if (user) {
      //   const createMessage = await ChatModel.create({
      //     text,
      //     sender: user._id,
      //     deliver,
      //     date:
      //       shamsi.gregorianToJalali(new Date())[0] +
      //       "/" +
      //       shamsi.gregorianToJalali(new Date())[1] +
      //       "/" +
      //       shamsi.gregorianToJalali(new Date())[2],
      //     month: shamsi.gregorianToJalali(new Date())[1],
      //     year: shamsi.gregorianToJalali(new Date())[0],
      //     day: shamsi.gregorianToJalali(new Date())[2],
      //   });
      // }
      // if (userPersonel) {
      //   const createMessage = await ChatModel.create({
      //     text,
      //     sender: userPersonel._id,
      //     deliver,
      //     date:
      //       shamsi.gregorianToJalali(new Date())[0] +
      //       "/" +
      //       shamsi.gregorianToJalali(new Date())[1] +
      //       "/" +
      //       shamsi.gregorianToJalali(new Date())[2],
      //     month: shamsi.gregorianToJalali(new Date())[1],
      //     year: shamsi.gregorianToJalali(new Date())[0],
      //     day: shamsi.gregorianToJalali(new Date())[2],
      //   });
      // }

      const { sender, receiver, content } = req.body;

      try {
        const newMessage = await ChatModel.create({
          sender,
          receiver,
          content,
        });

        res.status(200).json({
          message: "Chat Created",
          status: 200,
          receiver,
          date: new Date().toLocaleDateString("fa-ir"),
        });
      } catch (err) {
        console.log(err);

        res.status(500).json({ message: err.message });
      }

      // res.status(200).json({
      //   status: 200,
      //   message: "پیام با موفقیت اضافه شد",
      //   createDate: new Date().toLocaleDateString("fa-ir"),
      // });
    } catch (err) {
      next(err);
    }
  }

  async getChats(req, res, next) {
    const { user1, user2 } = req.body;

    try {
      const dataGet = await ChatModel.find({
        $or: [
          { sender: user1, receiver: user2 },
          { sender: user2, receiver: user1 },
        ],
      });
      // res.json(messages);

      res.status(200).json({
        status: 200,
        data: { dataGet },
        message: "پیام با موفقیت دریافت شد",
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (err) {
      next(err);
      res.status(500).json({
        status: 500,
        data: { dataGet },
        message: err,
      });
    }

    // try {
    //   const { _id } = req.body;
    //   const authorization = req.headers.authorization;
    //   const [bearer, token] = authorization.split(" ");

    //   const verifyResult = await verifyAccessToken(token);

    //   const user = await UserModel.findOne({ phone: verifyResult.phone });
    //   const userPersonel = await UserPersonelModel.findOne({
    //     phone: verifyResult.phone,
    //   });

    //   const chatInfo = await ChatModel.findOne({
    //     deliver: _id,
    //   });

    //   let dataGet = [];
    //   let itWasSender;

    //   if (user) {
    //     dataGet = await ChatModel.find({
    //       deliver: chatInfo.deliver,
    //     });
    //     itWasSender = user._id;
    //   }
    //   if (userPersonel) {
    //     dataGet = await ChatModel.find({
    //       deliver: chatInfo.deliver,
    //     });
    //     itWasSender = userPersonel._id;
    //   }

    //   res.status(200).json({
    //     status: 200,
    //     data: { dataGet },
    //     itWasSender,
    //     message: "پیام با موفقیت دریافت شد",
    //     createDate: new Date().toLocaleDateString("fa-ir"),
    //   });
    // } catch (error) {
    //   next(error);
    // }
  }
}
module.exports = { UserController: new UserController() };
