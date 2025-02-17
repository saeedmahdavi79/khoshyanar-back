const { AdsModel } = require("../../../models/ads/ads.model");
const { UserModel } = require("../../../models/auth/auth.model");
const { ContactsModel } = require("../../../models/contact/contacts.model");
const { CustomersModel } = require("../../../models/customers/customers.model");
const {
  FYModel,
} = require("../../../models/production/financialYear/fy.model");
const { UserPersonelModel } = require("../../../models/users/users.model");
const { VisitorModel } = require("../../../models/visitor/vistior.model");
const { verifyAccessToken } = require("../../../modules/functions");
const { sha256pass } = require("../../../utils/access");
const Controller = require("../controller");
var shamsi = require("shamsi-date-converter");
const randomUsernameGenerator = require("random-username-generator");
const { baseUrl } = require("../../../utils/baseUrl");
const { OrdersModel } = require("../../../models/contact/orders.model");

//Public Class
class ContactController extends Controller {
  async createContact(req, res, next) {
    try {
      const {
        contactName,
        contactCompany,
        contactCompanyId,
        contactPosition,
        staticPhone,
        phone,
        fax,
        email,
        address,
        nationalCode,
        birthDate,
        leadName,
        leadId,
        marriedDate,
        description,
        userImageProfile,
      } = req.body;

      if (
        !contactName &&
        !email &&
        !phone &&
        !contactPosition &&
        !staticPhone &&
        !contactCompany
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
          const user = await VisitorModel.findOne({
            email: verifyResult.email,
          });

          const createContact = await ContactsModel.create({
            contactName,
            contactCompany,
            contactCompanyId,
            contactPosition,
            staticPhone,
            phone,
            fax,
            email,
            visitorId: user._id,
            visitorUser: user.visitorName,
            adminId: user.adminUser,
            address,
            nationalCode,
            birthDate,
            marriedDate,
            description,
            leadName,
            leadId,
            userImageProfile,
            month: shamsi.gregorianToJalali(new Date())[1],
            year: shamsi.gregorianToJalali(new Date())[0],
            day: shamsi.gregorianToJalali(new Date())[2],
          });

          res.status(202).json({
            status: 202,
            message: ` کانتکت : ${contactName} افزوده شد`,
            createDate: new Date(),
          });
        } catch (error) {
          next(error);
        }
      }
    } catch (err) {
      next(err);
    }
  }

  async getAllContacts(req, res, next) {
    try {
      try {
        const dataGet = await ContactsModel.find();
        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: { dataGet },
          message: "همه کانتکت ها دریافت شدند !",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getVisitorContacts(req, res, next) {
    try {
      try {
        const authorization = req.headers.authorization;
        const [bearer, token] = authorization.split(" ");

        const verifyResult = await verifyAccessToken(token);
        const user = (
          await ContactsModel.find({
            visitorId: verifyResult.userID,
          })
        ).reverse();

        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: { user },
          message: "کانتکت ها دریافت شدند",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getAdminContacts(req, res, next) {
    try {
      try {
        const authorization = req.headers.authorization;
        const [bearer, token] = authorization.split(" ");

        const verifyResult = await verifyAccessToken(token);
        const user = await UserModel.findOne({
          phone: verifyResult.phone,
        });

        const dataGet = (
          await ContactsModel.find({
            adminId: user._id,
          })
        ).reverse();

        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: { dataGet },
          message: "کانتکت ها دریافت شدند",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getVisitorContactById(req, res, next) {
    try {
      try {
        const { _id } = req.body;
        const dataGet = await ContactsModel.find({ _id: _id });

        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: { dataGet },
          message: "کانتکت ها دریافت شدند",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getAdminContactById(req, res, next) {
    try {
      try {
        const { _id } = req.body;
        const dataGet = await ContactsModel.find({ _id: _id });

        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: { dataGet },
          message: "کانتکت ها دریافت شدند",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getContactsInMonth(req, res, next) {
    try {
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({ phone: verifyResult.phone });
      const userPersonel = await UserPersonelModel.findOne({
        phone: verifyResult.phone,
      });

      const getFyYear = await FYModel.findOne({
        adminId: !user ? userPersonel.adminUser : user._id,
        activeYear: "active",
      });

      const farvardin = await CustomersModel.find({
        year: getFyYear.fyValue,
        month: "1",
        adminUser: !user ? userPersonel.adminUser : user._id,
      });
      const ordibehesht = await CustomersModel.find({
        adminUser: !user ? userPersonel.adminUser : user._id,
        year: getFyYear.fyValue,
        month: "2",
      });
      const khordad = await CustomersModel.find({
        adminUser: !user ? userPersonel.adminUser : user._id,
        year: getFyYear.fyValue,
        month: "3",
      });
      const tir = await CustomersModel.find({
        adminUser: !user ? userPersonel.adminUser : user._id,
        year: getFyYear.fyValue,
        month: "4",
      });
      const mordad = await CustomersModel.find({
        year: getFyYear.fyValue,
        month: "5",
        adminUser: !user ? userPersonel.adminUser : user._id,
      });
      const shahrivar = await CustomersModel.find({
        adminUser: !user ? userPersonel.adminUser : user._id,
        year: getFyYear.fyValue,
        month: "6",
      });
      const mehr = await CustomersModel.find({
        adminUser: !user ? userPersonel.adminUser : user._id,
        year: getFyYear.fyValue,
        month: "7",
      });
      const aban = await CustomersModel.find({
        adminUser: !user ? userPersonel.adminUser : user._id,
        year: getFyYear.fyValue,
        month: "8",
      });
      const azar = await CustomersModel.find({
        adminUser: !user ? userPersonel.adminUser : user._id,
        year: getFyYear.fyValue,
        month: "9",
      });
      const dey = await CustomersModel.find({
        adminUser: !user ? userPersonel.adminUser : user._id,
        year: getFyYear.fyValue,
        month: "10",
      });
      const bahman = await CustomersModel.find({
        adminUser: !user ? userPersonel.adminUser : user._id,
        year: getFyYear.fyValue,
        month: "11",
      });
      const esfand = await CustomersModel.find({
        adminUser: !user ? userPersonel.adminUser : user._id,
        year: getFyYear.fyValue,
        month: "12",
      });

      res.status(200).json({
        status: 200,
        message: "تعداد مخاطبان در ماه های مختلف سال مالی دریافت شد",
        year: getFyYear.fyValue,
        data: {
          farvardin: farvardin.filter((l) => l.name != " ").length,
          ordibehesht: ordibehesht.filter((l) => l.name != " ").length,
          khordad: khordad.filter((l) => l.name != " ").length,
          tir: tir.filter((l) => l.name != " ").length,
          mordad: mordad.filter((l) => l.name != " ").length,
          shahrivar: shahrivar.filter((l) => l.name != " ").length,
          mehr: mehr.filter((l) => l.name != " ").length,
          aban: aban.filter((l) => l.name != " ").length,
          azar: azar.filter((l) => l.name != " ").length,
          dey: dey.filter((l) => l.name != " ").length,
          bahman: bahman.filter((l) => l.name != " ").length,
          esfand: esfand.filter((l) => l.name != " ").length,
        },
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (error) {
      next(error);
    }
  }

  async getCountOfContacts(req, res, next) {
    try {
      try {
        const authorization = req.headers.authorization;
        const [bearer, token] = authorization.split(" ");

        const verifyResult = await verifyAccessToken(token);
        const user = await UserModel.findOne({ phone: verifyResult.phone });
        const userPersonel = await UserPersonelModel.findOne({
          phone: verifyResult.phone,
        });

        const dataGet = await CustomersModel.find({
          adminUser: !user ? userPersonel.adminUser : user._id,
        });

        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: !dataGet.length
            ? 0
            : dataGet.filter((l) => l.name != " ").length,
          message: "تعداد کارشناسان دریافت شدند",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async editContact(req, res, next) {
    try {
      const {
        _id,
        contactName,
        contactCompany,
        contactCompanyId,
        contactPosition,
        staticPhone,
        phone,
        fax,
        email,
        address,
        nationalCode,
        birthDate,
        leadName,
        leadId,
        marriedDate,
        description,
        userImageProfile,
      } = req.body;

      if (!_id && !contactName) {
        res.status(500).json({
          status: 500,
          message: "اطلاعات ارسالی کامل نمی باشد ، لطفا مجدد بازبینی کنید",
          requestDate: new Date().toLocaleDateString("fa-ir"),
        });
      } else {
        const putVisitor = await ContactsModel.findOneAndUpdate(
          { _id },
          {
            contactName,
            contactCompany,
            contactCompanyId,
            contactPosition,
            staticPhone,
            phone,
            fax,
            email,
            address,
            nationalCode,
            birthDate,
            leadName,
            leadId,
            marriedDate,
            description,
            userImageProfile,
          }
        );
        res.status(202).json({
          status: 202,
          message: ` کانتکت : ${contactName} ویرایش شد`,
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async removeContacts(req, res, next) {
    try {
      const { _id } = req.body;
      try {
        const dataFind = await ContactsModel.findOne({
          _id,
        });

        if (dataFind) {
          const dataGet = await ContactsModel.findOneAndDelete({
            _id,
          });

          res.status(200).json({
            status: 200,
            requestDate: new Date(),
            message: "کانتکت با موفقیت حذف شد",
          });

          if (!dataFind) {
            res.status(200).json({
              status: 200,
              requestDate: new Date(),
              message: "کانتکت یافت نشد",
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

  //Customers

  async createCustomer(req, res, next) {
    try {
      const {
        name,
        perName,
        financialCode,
        conName,
        conDes,
        birthDate,
        nationalCode,
        state,
        city,
        address,
        postalCode,
        workType,
        relationType,
        countOfPersonel,
        ownerShip,
        connection,
        type,
        coType,
        sabtNumber,
        buissCode,
        lon,
        lat,
        phone,
        des,
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

        const userName = randomUsernameGenerator.generate();
        const getRandomInteger = (min, max) => {
          min = Math.ceil(min);
          max = Math.floor(max);

          return Math.floor(Math.random() * (max - min)) + min;
        };

        const randId = getRandomInteger(10000, 99999);
        const hashedPassword = await sha256pass("123456");
        if (user) {
          const createContact = await CustomersModel.create({
            name,
            perName,
            financialCode,
            conName,
            conDes,
            birthDate,
            nationalCode,
            state,
            city,
            address,
            postalCode,
            workType,
            relationType,
            countOfPersonel,
            ownerShip,
            connection,
            type,
            coType,
            sabtNumber,
            buissCode,
            lon,
            lat,
            phone,
            userName,
            des,
            password: randId,
            adminUser: user._id,
            adminUserName: user.name + " " + user.lastName,
            month: shamsi.gregorianToJalali(new Date())[1],
            year: shamsi.gregorianToJalali(new Date())[0],
            day: shamsi.gregorianToJalali(new Date())[2],
          });
        }
        if (userPersonel) {
          const createContact = await CustomersModel.create({
            name,
            perName,
            financialCode,
            conName,
            conDes,
            birthDate,
            nationalCode,
            state,
            city,
            address,
            postalCode,
            workType,
            relationType,
            countOfPersonel,
            ownerShip,
            connection,
            type,
            coType,
            sabtNumber,
            buissCode,
            lon,
            lat,
            phone,
            des,
            userName,
            password: randId,
            adminUser: userPersonel._id,
            adminUserName: userPersonel.name + " " + userPersonel.lastName,
            month: shamsi.gregorianToJalali(new Date())[1],
            year: shamsi.gregorianToJalali(new Date())[0],
            day: shamsi.gregorianToJalali(new Date())[2],
          });
        }

        res.status(202).json({
          status: 202,
          message: ` مشتری افزوده شد`,
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async editCustomer(req, res, next) {
    try {
      const {
        _id,
        name,
        perName,
        financialCode,
        conName,
        conDes,
        birthDate,
        nationalCode,
        state,
        city,
        address,
        postalCode,
        workType,
        relationType,
        countOfPersonel,
        ownerShip,
        connection,
        type,
        coType,
        sabtNumber,
        buissCode,
        lon,
        lat,
        phone,
        des,
        userName,
        password,
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
          const createContact = await CustomersModel.findOneAndUpdate(
            { _id },
            {
              name,
              perName,
              financialCode,
              conName,
              conDes,
              birthDate,
              nationalCode,
              state,
              city,
              address,
              postalCode,
              workType,
              relationType,
              countOfPersonel,
              ownerShip,
              connection,
              type,
              coType,
              sabtNumber,
              buissCode,
              lon,
              lat,
              phone,
              des,
              userName,
              password,
              adminUser: user._id,
              adminUserName: user.name + " " + user.lastName,
              month: shamsi.gregorianToJalali(new Date())[1],
              year: shamsi.gregorianToJalali(new Date())[0],
              day: shamsi.gregorianToJalali(new Date())[2],
            }
          );
        }
        if (userPersonel) {
          const createContact = await CustomersModel.findOneAndUpdate(
            { _id },
            {
              name,
              perName,
              financialCode,
              conName,
              conDes,
              birthDate,
              nationalCode,
              state,
              city,
              address,
              postalCode,
              workType,
              relationType,
              countOfPersonel,
              ownerShip,
              connection,
              type,
              coType,
              sabtNumber,
              buissCode,
              lon,
              lat,
              phone,
              des,
              userName,
              password,
              adminUser: userPersonel.adminUser,
              adminUserName: userPersonel.name + " " + userPersonel.lastName,
              month: shamsi.gregorianToJalali(new Date())[1],
              year: shamsi.gregorianToJalali(new Date())[0],
              day: shamsi.gregorianToJalali(new Date())[2],
            }
          );
        }

        res.status(202).json({
          status: 202,
          message: ` مشتری ویرایش شد`,
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async removeCustomer(req, res, next) {
    try {
      const { _id } = req.body;
      try {
        const dataFind = await CustomersModel.findOneAndDelete({
          _id,
        });

        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          message: "کانتکت با موفقیت حذف شد",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getCustomers(req, res, next) {
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
        (dataGet = await CustomersModel.find({})).reverse();
      }
      if (userPersonel) {
        if (userPersonel.access == "1") {
          (dataGet = await CustomersModel.find({})).reverse();
        } else {
          (dataGet = await CustomersModel.find({
            adminUser: userPersonel._id,
          })).reverse();
        }
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
  }

  async getCustomersMandeAndScore(req, res, next) {
    try {
      const { userId, tokenTak } = req.body;
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const fetchDataMande = await fetch(
        baseUrl(
          `/services/Base/ApiService/GetDebitRemain?FiscalYear=1403&AcntCode=${userId}`
        ),
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenTak}`,
            "Content-Type": "application/json",
            "Abp.TenantId": "1",
          },
        }
      );

      const responseDataMande = await fetchDataMande.json();

      const fetchDataScore = await fetch(
        baseUrl(
          `/services/Base/ApiService/GetCustomerScore?FiscalYear=1403&AcntCode=${userId}`
        ),
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenTak}`,
            "Content-Type": "application/json",
            "Abp.TenantId": "1",
          },
        }
      );

      const responseDataScore = await fetchDataScore.json();

      // const verifyResult = await verifyAccessToken(token);
      // const user = await UserModel.findOne({
      //   phone: verifyResult.phone,
      // });
      // const userPersonel = await UserPersonelModel.findOne({
      //   phone: verifyResult.phone,
      // });

      // let dataGet = [];

      // if (user) {
      //   (dataGet = await CustomersModel.find({
      //     adminUser: user._id,
      //   })).reverse();
      // }
      // if (userPersonel) {
      //   (dataGet = await CustomersModel.find({
      //     adminUser: userPersonel.adminUser,
      //   })).reverse();
      // }

      res.status(202).json({
        status: 202,
        message: "اطلاعات دریافت شد",
        responseDataMande,
        responseDataScore,
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (error) {
      next(error);
    }
  }

  async addOrder(req, res, next) {
    const { products, title } = req.body; // products باید یک آرایه از اشیاء باشد
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

      const getRandomInteger = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min)) + min;
      };

      const randId = getRandomInteger(10000, 99999);

      if (user) {
        const addOrder = await OrdersModel.create({
          products,
          adminId: user._id,
          adminName: user.name + " " + user.lastName,
          title,

          code: randId,
          month: shamsi.gregorianToJalali(new Date())[1],
          year: shamsi.gregorianToJalali(new Date())[0],
        });
      }

      if (userPersonel) {
        const addOrder = await OrdersModel.create({
          products,
          adminId: userPersonel._id,
          adminName: userPersonel.name + " " + userPersonel.lastName,
          title,

          code: randId,
          month: shamsi.gregorianToJalali(new Date())[1],
          year: shamsi.gregorianToJalali(new Date())[0],
        });
      }

      if (userCustomer) {
        const addOrder = await OrdersModel.create({
          products,
          adminId: userCustomer._id,
          adminName: userCustomer.name,
          title,

          code: randId,
          month: shamsi.gregorianToJalali(new Date())[1],
          year: shamsi.gregorianToJalali(new Date())[0],
        });
      }

      res.status(202).json({
        status: 202,
        message: "اطلاعات بروز شد",

        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "اطلاعات بروز نشد",

        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    }
  }

  async getOrder(req, res, next) {
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
        dataGet = (await OrdersModel.find()).reverse();
      }

      if (userPersonel) {
        dataGet = (await OrdersModel.find()).reverse();
      }

      if (userCustomer) {
        dataGet = await OrdersModel.find({
          adminId: userCustomer._id,
        });
      }
      res.status(202).json({
        status: 202,
        message: "اطلاعات دریافت شد",
        data: { dataGet },
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "اطلاعات بروز نشد",

        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    }
  }

  async orderAdminConfirm(req, res, next) {
    try {
      const { _id } = req.body;
      try {
        const dataConf = await OrdersModel.findOneAndUpdate(
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

  async orderOpConfirm(req, res, next) {
    try {
      const { _id } = req.body;

      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");
      const verifyResult = await verifyAccessToken(token);

      const userPersonel = await UserPersonelModel.findOne({
        phone: verifyResult.phone,
      });

      try {
        const dataConf = await OrdersModel.findOneAndUpdate(
          {
            _id,
          },
          {
            statusOp: "true",
            statusOpUser: userPersonel.name + " " + userPersonel.lastName,
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

  async transferCustomer(req, res, next) {
    try {
      const { _id, adminId } = req.body;

      // console.log({ _id, adminId });
      try {
        const user = await UserModel.findOne({
          _id: adminId,
        });
        const userPersonel = await UserPersonelModel.findOne({
          _id: adminId,
        });

        if (user) {
          const createContact = await CustomersModel.findOneAndUpdate(
            { _id },
            {
              adminUser: user._id,
              adminUserName: user.name + " " + user.lastName,
            }
          );
        }
        if (userPersonel) {
          const createContact = await CustomersModel.findOneAndUpdate(
            { _id },
            {
              adminUser: userPersonel._id,
              adminUserName: userPersonel.name + " " + userPersonel.lastName,
            }
          );
        }

        res.status(202).json({
          status: 202,
          message: ` مشتری ویرایش شد`,
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async getGhardesh(req, res, next) {
    try {
      const { tokenTakro, code } = req.body;

      // console.log({ _id, adminId });
      try {
        const fetchData = await fetch(
          baseUrl(
            `/services/Base/ApiService/GetAccountTurnover?FiscalYear=1403&AcntCode=${code}`
          ),
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tokenTakro}`,
              "Content-Type": "application/json",
              "Abp.TenantId": "1",
            },
          }
        );

        const responseData = await fetchData.json();

        console.log(responseData);

        res.status(202).json({
          status: 202,
          responseData,
          message: ` مشتری ویرایش شد`,
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async getMandeh(req, res, next) {
    try {
      const { tokenTakro, code } = req.body;

      const month = shamsi.gregorianToJalali(new Date())[1];
      const year = shamsi.gregorianToJalali(new Date())[0];
      const day = shamsi.gregorianToJalali(new Date())[2];

      // console.log({ _id, adminId });
      try {
        const fetchData = await fetch(
          baseUrl(
            `/services/Base/ApiService/GetDebitRemain?FiscalYear=1403&AcntCode=${code}&DocDate=${year}/${month}/${day}`
          ),
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tokenTakro}`,
              "Content-Type": "application/json",
              "Abp.TenantId": "1",
            },
          }
        );

        const responseData = await fetchData.json();

        res.status(202).json({
          status: 202,
          responseData,
          message: ` مشتری ویرایش شد`,
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
module.exports = { ContactController: new ContactController() };
