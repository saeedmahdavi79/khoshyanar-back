const { UserModel } = require("../../../models/auth/auth.model");
const { LeadModel } = require("../../../models/lead/lead.model");
const {
  FYModel,
} = require("../../../models/production/financialYear/fy.model");
const { VisitorModel } = require("../../../models/visitor/vistior.model");
const { verifyAccessToken } = require("../../../modules/functions");
const Controller = require("../controller");
var shamsi = require("shamsi-date-converter");

//lib
const axios = require("axios");
const cheerio = require("cheerio");
const { chromium } = require("playwright");
const url = require("url");
const { UserPersonelModel } = require("../../../models/users/users.model");
const { ContractModel } = require("../../../models/contract/contract.model");

//const puppeteer = require("puppeteer");

//Public Class
class LeadController extends Controller {
  async createLead(req, res, next) {
    try {
      const {
        leadName,
        leadSubject,
        leadCompany,
        leadCompanyId,
        leadPosition,
        leadEmail,
        staticPhone,
        phone,
        leadWebsite,
        leadAddress,
        leadType,
        leadSource,
        leadLevel,
        leadStatus,
        leadCompanyCount,
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
          const createLead = await LeadModel.create({
            leadName,
            leadSubject,
            adminUser: user._id,
            adminUserName: user.name + " " + user.lastName,
            leadCompany,
            leadCompanyId,
            leadPosition,
            leadEmail,
            staticPhone,
            phone,
            leadWebsite,
            leadAddress,
            leadType,
            leadSource,
            leadLevel,
            leadStatus,
            leadCompanyCount,
            month: shamsi.gregorianToJalali(new Date())[1],
            year: shamsi.gregorianToJalali(new Date())[0],
            day: shamsi.gregorianToJalali(new Date())[2],
          });
        }
        if (userPersonel) {
          const createLead = await LeadModel.create({
            leadName,
            leadSubject,
            adminUser: userPersonel.adminUser,
            adminUserName: userPersonel.name + " " + userPersonel.lastName,
            leadCompany,
            leadCompanyId,
            leadPosition,
            leadEmail,
            staticPhone,
            phone,
            leadWebsite,
            leadAddress,
            leadType,
            leadSource,
            leadLevel,
            leadStatus,
            leadCompanyCount,
            month: shamsi.gregorianToJalali(new Date())[1],
            year: shamsi.gregorianToJalali(new Date())[0],
            day: shamsi.gregorianToJalali(new Date())[2],
          });
        }

        res.status(202).json({
          status: 202,
          message: ` سرنخ : ${leadName} ایجاد شد`,
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async getAllLeads(req, res, next) {
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
          dataGet = await LeadModel.find({
            adminUser: user._id,
          });
        }
        if (userPersonel) {
          dataGet = await LeadModel.find({
            adminUser: userPersonel.adminUser,
          });
        }
        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: { dataGet },
          message: "سر نخ ها دریافت شدند !",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getAllLeadsOfVisitor(req, res, next) {
    try {
      try {
        const authorization = req.headers.authorization;
        const [bearer, token] = authorization.split(" ");

        const verifyResult = await verifyAccessToken(token);
        const user = await VisitorModel.findOne({
          email: verifyResult.email,
        });

        const dataGet = (
          await LeadModel.find({ visitorId: user._id })
        ).reverse();
        res.status(200).json({
          status: 200,
          requestDate: new Date().toLocaleDateString("fa-ir"),
          data: { dataGet },
          message: "سر نخ ها دریافت شدند !",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getLeadById(req, res, next) {
    try {
      try {
        const { _id } = req.body;
        const dataGet = await LeadModel.find({ _id });
        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: { dataGet },
          message: "سرنخ دریافت شد",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getAllLeadsOfAdminUser(req, res, next) {
    try {
      try {
        const authorization = req.headers.authorization;
        const [bearer, token] = authorization.split(" ");

        const verifyResult = await verifyAccessToken(token);
        const user = await UserModel.findOne({
          phone: verifyResult.phone,
        });

        const dataGet = (await LeadModel.find({ adminId: user._id })).reverse();
        res.status(200).json({
          status: 200,
          requestDate: new Date().toLocaleDateString("fa-ir"),
          data: { dataGet },
          message: "سر نخ ها دریافت شدند !",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async editLead(req, res, next) {
    try {
      const {
        _id,
        leadName,
        leadSubject,
        leadPosition,
        leadEmail,
        staticPhone,
        phone,
        leadWebsite,
        leadAddress,
        leadType,
        leadSource,
        leadLevel,
        leadStatus,
        leadCompanyCount,
        createDate,
      } = req.body;

      if (!_id && !leadName) {
        res.status(500).json({
          status: 500,
          message: "اطلاعات ارسالی کامل نمی باشد ، لطفا مجدد بازبینی کنید",
          requestDate: new Date().toLocaleDateString("fa-ir"),
        });
      } else {
        const putVisitor = await LeadModel.findOneAndUpdate(
          { _id },
          {
            leadName,
            leadSubject,
            leadPosition,
            leadEmail,
            staticPhone,
            phone,
            leadWebsite,
            leadAddress,
            leadType,
            leadSource,
            leadLevel,
            leadStatus,
            leadCompanyCount,
            createDate,
          }
        );
        res.status(202).json({
          status: 202,
          message: ` سرنخ : ${contactName} ویرایش شد`,
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async getLeadsInMonth(req, res, next) {
    try {
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({ phone: verifyResult.phone });

      const getFyYear = await FYModel.findOne({
        adminId: user._id,
        activeYear: "active",
      });

      const farvardin = await LeadModel.find({
        year: getFyYear.fyValue,
        month: "1",
        adminId: user._id.toString(),
      }).count();
      const ordibehesht = await LeadModel.find({
        adminId: user._id.toString(),
        year: getFyYear.fyValue,
        month: "2",
      }).count();
      const khordad = await LeadModel.find({
        adminId: user._id.toString(),
        year: getFyYear.fyValue,
        month: "3",
      }).count();
      const tir = await LeadModel.find({
        adminId: user._id.toString(),
        year: getFyYear.fyValue,
        month: "4",
      }).count();
      const mordad = await LeadModel.find({
        year: getFyYear.fyValue,
        month: "5",
        adminId: user._id.toString(),
      }).count();
      const shahrivar = await LeadModel.find({
        adminId: user._id.toString(),
        year: getFyYear.fyValue,
        month: "6",
      }).count();
      const mehr = await LeadModel.find({
        adminId: user._id.toString(),
        year: getFyYear.fyValue,
        month: "7",
      }).count();
      const aban = await LeadModel.find({
        adminId: user._id.toString(),
        year: getFyYear.fyValue,
        month: "8",
      }).count();
      const azar = await LeadModel.find({
        adminId: user._id.toString(),
        year: getFyYear.fyValue,
        month: "9",
      }).count();
      const dey = await LeadModel.find({
        adminId: user._id.toString(),
        year: getFyYear.fyValue,
        month: "10",
      }).count();
      const bahman = await LeadModel.find({
        adminId: user._id.toString(),
        year: getFyYear.fyValue,
        month: "11",
      }).count();
      const esfand = await LeadModel.find({
        adminId: user._id.toString(),
        year: getFyYear.fyValue,
        month: "12",
      }).count();

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

  async getCountOfLeads(req, res, next) {
    try {
      try {
        const authorization = req.headers.authorization;
        const [bearer, token] = authorization.split(" ");

        const verifyResult = await verifyAccessToken(token);
        const user = await UserModel.findOne({ phone: verifyResult.phone });

        const dataGet = await LeadModel.find({
          adminUser: user._id.toString(),
        });

        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: !dataGet.length ? 0 : dataGet.length,
          message: "تعداد سرنخ ها دریافت شدند",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getDataFromTrendYol(req, res, next) {
    try {
      try {
        const { productId } = req.body;

        //const url = `https://www.trendyol.com/en/laluvia/black-buttoned-pile-detailed-palazzo-trousers-p-${productId}?boutiqueId=48&merchantId=968`;
        const urlApp = `https://www.trendyol.com/${productId}`;

        try {
          // راه اندازی مرورگر Chromium
          const browser = await chromium.launch({
            headless: true, // برای اجرای بدون رابط کاربری
          });
          const page = await browser.newPage();
          await page.goto(urlApp, {
            timeout: 100000,
            waitUntil: "networkidle",
          });

          const parsedUrl = url.parse(urlApp, true);

          const queryStrings = parsedUrl.query;

          // استخراج اطلاعات محصول
          const productDetails = await page.evaluate(() => {
            const productName = document
              .querySelector("h1.pr-new-br")
              ?.innerText.trim();
            const productPrice = document
              .querySelector("span.prc-dsc")
              ?.innerText.trim();
            const productImage = Array.from(
              document.querySelectorAll(".base-product-image div img")
            ).map((img) => img.src);
            const productDescription = document
              .querySelector("ul.detail-desc-list")
              ?.innerText.trim();

            const productBrand = document
              .querySelector("a.product-brand-name-with-link")
              ?.innerText.trim();

            return {
              productName,
              productPrice,
              productImage,
              productDescription,
              productBrand,
            };
          });

          await browser.close();

          const productSize = queryStrings.v;
          const boutiqueId = queryStrings.boutiqueId;
          const merchantId = queryStrings.merchantId;

          // ارسال پاسخ به کاربر
          res.json({
            message: "Product added to cart",
            productSize,
            boutiqueId,
            merchantId,
            ...productDetails,
          });
        } catch (error) {
          res
            .status(500)
            .json({ message: "Error fetching product", error: error.message });
        }
        // const { data } = await axios.get(url);
        // const $ = cheerio.load(data);

        // // استخراج اطلاعات محصول
        // const productName = $("h1.brand").text();
        // const productPrice = $(".highlighted-brand").text().trim();
        // const productImage = $("img.product-image").attr("src"); // فرض بر این است که عنصر img دارای کلاس product-image است
        // const productDescription = $(".product-description"); // فرض بر این است که توضیحات محصول در div با کلاس product-description است
        // const productBrand = $("h1.brand-name").text().trim();
        // const productSize = $("select.size-selector option:checked")
        //   .text()
        //   .trim(); // فرض بر این است که سایزها در یک select با کلاس size-selector قرار دارد

        // // اینجا می‌توانید کد خود را برای اضافه کردن محصول به سبد خرید در Next.js بنویسید
        // res.json({
        //   message: "Product added to cart",
        //   productBrand,
        //   productPrice,
        //   productImage,
        //   //productDescription,
        //   productSize,
        // });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async getDataFromHepsi(req, res, next) {
    try {
      try {
        const { productId } = req.body;

        const urlApp = `https://www.hepsiburada.com/${productId}`;

        try {
          // راه اندازی مرورگر Chromium
          const browser = await chromium.launch({
            headless: true, // برای اجرای بدون رابط کاربری
          });

          const page = await browser.newPage();
          await page.goto(urlApp, {
            timeout: 100000,
            waitUntil: "networkidle",
          });

          // استخراج اطلاعات محصول
          const productDetails = await page.evaluate(() => {
            const productName = document
              .querySelector("h1.xeL9CQ3JILmYoQPCgDcl")
              ?.innerText.trim();
            const productPrice = document
              .querySelector("div.rNEcFrF82c7bJGqQHxht")
              ?.innerText.trim();
            const productImage = document.querySelector(
              "img.i9jTSpEeoI29_M1mOKct"
            )?.src;
            const productDescription = document
              .querySelector("div.sf-ProductDescription-ELfL1tuePGs5IVj8XHGy")
              ?.innerText.trim();

            const productBrand = document
              .querySelector("a.lDeVj9TGkwG5ZFgFc_YQ")
              ?.innerText.trim();

            return {
              productName,
              productPrice,
              productImage,
              productDescription,
              productBrand,
            };
          });

          await browser.close();

          // ارسال پاسخ به کاربر
          res.json({
            message: "Product added to cart",

            ...productDetails,
          });
        } catch (error) {
          res
            .status(500)
            .json({ message: "Error fetching product", error: error.message });
        }
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async removeLeads(req, res, next) {
    try {
      const { _id } = req.body;
      try {
        const dataFind = await LeadModel.findOneAndDelete({
          _id,
        });

        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          message: "Remove Successfully!",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async createContract(req, res, next) {
    try {
      const {
        name,
        coName,
        text,
        date,
        type,
        phone,
        contractName,
        contractPrice,
        contractStep,
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
          const createContract = await ContractModel.create({
            name,
            coName,
            adminUser: user._id,
            adminUserName: user.name + " " + user.lastName,
            text,
            date,
            type,
            phone,
            contractName,
            contractStep,
            contractPrice,
            month: shamsi.gregorianToJalali(new Date())[1],
            year: shamsi.gregorianToJalali(new Date())[0],
            day: shamsi.gregorianToJalali(new Date())[2],
          });
        }
        if (userPersonel) {
          const createContract = await ContractModel.create({
            name,
            coName,
            adminUser: userPersonel.adminUser,
            adminUserName: userPersonel.name + " " + userPersonel.lastName,
            text,
            date,
            type,
            phone,
            contractName,
            contractStep,
            contractPrice,
            month: shamsi.gregorianToJalali(new Date())[1],
            year: shamsi.gregorianToJalali(new Date())[0],
            day: shamsi.gregorianToJalali(new Date())[2],
          });
        }

        res.status(202).json({
          status: 202,
          message: ` معامله ایجاد شد`,
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async getAllContracts(req, res, next) {
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
          dataGet = await ContractModel.find({
            adminUser: user._id,
          });
        }
        if (userPersonel) {
          dataGet = await ContractModel.find({
            adminUser: userPersonel.adminUser,
          });
        }
        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: { dataGet },
          message: "معاملات دریافت شدند !",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async editContract(req, res, next) {
    try {
      const {
        _id,
        name,
        coName,
        text,
        date,
        type,
        phone,
        contractName,
        contractStep,
      } = req.body;

      if (!_id && !leadName) {
        res.status(500).json({
          status: 500,
          message: "اطلاعات ارسالی کامل نمی باشد ، لطفا مجدد بازبینی کنید",
          requestDate: new Date().toLocaleDateString("fa-ir"),
        });
      } else {
        const putVisitor = await ContractModel.findOneAndUpdate(
          { _id },
          {
            name,
            coName,
            text,
            date,
            type,
            phone,
            contractName,
            contractStep,
          }
        );
        res.status(202).json({
          status: 202,
          message: ` معامله ویرایش شد`,
          createDate: new Date().toLocaleDateString("fa-ir"),
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async removeContract(req, res, next) {
    try {
      const { _id } = req.body;
      try {
        const dataFind = await ContractModel.findOneAndDelete({
          _id,
        });

        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          message: "Remove Successfully!",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { LeadController: new LeadController() };
