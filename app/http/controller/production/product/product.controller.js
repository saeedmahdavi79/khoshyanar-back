const { isValidObjectId, Types, default: mongoose } = require("mongoose");

const createHttpError = require("http-errors");
const Controller = require("../../controller");
var shamsi = require("shamsi-date-converter");
const { default: slugify } = require("slugify");
const ProductModel = require("../../../../models/production/product/product.model");
const { verifyAccessToken } = require("../../../../modules/functions");
const { UserModel } = require("../../../../models/auth/auth.model");
const { UserPersonelModel } = require("../../../../models/users/users.model");
const {
  ResidBeAnbarModel,
} = require("../../../../models/production/product/residBeAnbar.model");
const {
  HavaleAzAnbarModel,
} = require("../../../../models/production/product/havaleAzAnbar.model");
const {
  CustomersModel,
} = require("../../../../models/customers/customers.model");
const { baseUrl } = require("../../../../utils/baseUrl");

//Public Class
class ProductController extends Controller {
  async createProduct(req, res, next) {
    try {
      const {
        title,
        des,
        formulaId,
        formulaName,
        machineCount,
        productCatId,
        productCatName,
        erpCount,
        vahed,
        vahed2,
        status,
        firstCount,
        entryCount,
        exportCount,
        sourceId,
        sourceName,
        slug,
        price,
        code,
        parent,
      } = req.body;

      const mainCountNew =
        parseInt(firstCount) + parseInt(entryCount) - parseInt(exportCount);

      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
        phone: verifyResult.phone,
      });

      await this.createProductDto({
        title,
        des,
        formulaId,
        formulaName,
        machineCount,
        productCatId,
        productCatName,
        erpCount,
        vahed,
        vahed2,
        status,
        firstCount,
        entryCount,
        mainCount: mainCountNew,
        exportCount,
        sourceId,
        sourceName,
        slug,
        code,
        parent,
        price,
        adminUser: user._id,
        adminUserName: user.name + " " + user.lastName,
        month: shamsi.gregorianToJalali(new Date())[1],
        year: shamsi.gregorianToJalali(new Date())[0],
        day: shamsi.gregorianToJalali(new Date())[2],
      });

      res.status(200).json({
        status: 200,
        message: "محصول با موفقیت ثبت شد",

        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (err) {
      next(err);
    }
  }

  async editProduct(req, res, next) {
    const {
      _id,
      title,
      des,
      formulaId,
      formulaName,
      machineCount,
      productCatId,
      productCatName,
      erpCount,
      vahed,
      vahed2,
      status,
      sourceId,
      sourceName,
      code,
      parent,
      price,
    } = req.body;

    try {
      const dataEdit = await ProductModel.findOneAndUpdate(
        { _id },
        {
          title,
          des,
          formulaId,
          formulaName,
          machineCount,
          productCatId,
          productCatName,
          erpCount,
          vahed,
          vahed2,
          status,
          sourceId,
          sourceName,
          code,
          parent,
          price,
        }
      );

      res.status(200).json({
        status: 200,
        message: "محصول با موفقیت ویرایش شد",
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (error) {
      next(error);
    }
  }

  async createProductDto(categoryDto) {
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

    const category = await ProductModel.create(categoryDto);

    return category;
  }

  async checkExistById(id) {
    const category = await ProductModel.findById(id);
    if (!category) throw new createHttpError.NotFound("دسته بندی یافت نشد");
    return category;
  }

  async checkExistBySlug(slug) {
    const category = await ProductModel.findOne({ slug });
    if (!category) throw new createHttpError.NotFound("دسته بندی یافت نشد");
    return category;
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
        const dataConf = await HavaleAzAnbarModel.findOneAndUpdate(
          {
            _id,
          },
          {
            statusOp: "true",
            statusOpUser: userPersonel.name + " " + userPersonel.lastName,
            statusOpUserSignImage: userPersonel.signImage,
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

  async orderOpManageConfirm(req, res, next) {
    try {
      const { _id } = req.body;

      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");
      const verifyResult = await verifyAccessToken(token);

      const userPersonel = await UserPersonelModel.findOne({
        phone: verifyResult.phone,
      });

      try {
        const dataConf = await HavaleAzAnbarModel.findOneAndUpdate(
          {
            _id,
          },
          {
            statusOpAdmin: "true",
            statusOpUserAdmin: userPersonel.name + " " + userPersonel.lastName,
            statusOpUserAdminSignImage: userPersonel.signImage,
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

  async orderOpManageConfirmAnbardar(req, res, next) {
    try {
      const { _id } = req.body;

      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");
      const verifyResult = await verifyAccessToken(token);

      const userPersonel = await UserPersonelModel.findOne({
        phone: verifyResult.phone,
      });

      try {
        const dataConf = await HavaleAzAnbarModel.findOneAndUpdate(
          {
            _id,
          },
          {
            statusOpAdminAnbardar: "true",
            statusOpUserAdminAnbardar:
              userPersonel.name + " " + userPersonel.lastName,
            statusOpUserAdminSignImageAnbardar: userPersonel.signImage,
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
  async alreadyExistBySlug(slug) {
    const category = await ProductModel.findOne({ slug });
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

  async getProductySRC(req, res, next) {
    try {
      const { sourceId } = req.body;
      try {
        const dataGet = await ProductModel.find({ sourceId });

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

  async incraseMojodi(req, res, next) {
    try {
      const { _id, newVal } = req.body;
      try {
        const dataPrd = await ProductModel.findOne({ _id });

        const newMojodi =
          parseInt(
            !dataPrd.mainCount
              ? 0
              : dataPrd.mainCount == "NaN"
              ? 0
              : dataPrd.mainCount
          ) + parseInt(newVal);

        const newMojodiInput =
          parseInt(
            !dataPrd.entryCount
              ? 0
              : dataPrd.entryCount == "NaN"
              ? 0
              : dataPrd.entryCount == ""
              ? 0
              : dataPrd.entryCount
          ) + parseInt(newVal);

        const dataConf = await ProductModel.findOneAndUpdate(
          {
            _id,
          },
          {
            entryCount: newMojodiInput,
            mainCount: newMojodi,
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

  async incraseMojodiList(req, res, next) {
    const { products, reciver, date, location, source, code, sourceName } =
      req.body; // products باید یک آرایه از اشیاء باشد
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
        const updatedProducts = [];

        for (const { _id, newVal } of products) {
          const product = await ProductModel.findById(_id);
          if (product) {
            product.entryCount =
              (parseInt(product.entryCount) || 0) + parseInt(newVal);
            product.mainCount =
              (parseInt(product.mainCount) || 0) + parseInt(newVal);

            await product.save();
            updatedProducts.push(product);
          } else {
            res.status(404).json({
              status: 404,
              message: "محصول موجود نیست",

              createDate: new Date().toLocaleDateString("fa-ir"),
            });
          }
        }

        const addResid = await ResidBeAnbarModel.create({
          products,
          adminId: user._id,
          adminName: user.name + " " + user.lastName,
          reciver,
          date,
          location,
          source,
          code,
          sourceName,
        });
      }

      if (userPersonel) {
        const updatedProducts = [];

        for (const { _id, newVal } of products) {
          const product = await ProductModel.findById(_id);
          if (product) {
            product.entryCount =
              (parseInt(product.entryCount) || 0) + parseInt(newVal);
            product.mainCount =
              (parseInt(product.mainCount) || 0) + parseInt(newVal);

            await product.save();
            updatedProducts.push(product);
          } else {
            res.status(404).json({
              status: 404,
              message: "محصول موجود نیست",

              createDate: new Date().toLocaleDateString("fa-ir"),
            });
          }
        }

        const addResid = await ResidBeAnbarModel.create({
          products,
          adminId: userPersonel.adminUser,
          adminName: userPersonel.name + " " + userPersonel.lastName,
          reciver,
          date,
          location,
          source,
          code,
          sourceName,
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

  async incraseMojodiAdminConfirm(req, res, next) {
    try {
      const { _id } = req.body;
      try {
        const dataConf = await ResidBeAnbarModel.findOneAndUpdate(
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

  async decraseMojodiList(req, res, next) {
    const {
      products,
      reciver,
      date,
      location,
      source,
      code,
      sourceName,
      exitRes,
      client,
      representative,
      carNumber,
    } = req.body; // products باید یک آرایه از اشیاء باشد
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
        const addResid = await HavaleAzAnbarModel.create({
          products,
          adminId: user._id,
          adminName: user.name + " " + user.lastName,
          reciver,
          date,
          location,
          source,
          code,
          sourceName,
          exitRes,
          client,
          representative,
          carNumber,
        });
      }

      if (userPersonel) {
        const addResid = await HavaleAzAnbarModel.create({
          products,
          adminId: userPersonel._id,
          adminName: userPersonel.name + " " + userPersonel.lastName,
          reciver,
          date,
          location,
          source,
          code,
          sourceName,
          exitRes,
          client,
          representative,
          carNumber,
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

  async incraseMojodiGet(req, res, next) {
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
          dataGet = await ResidBeAnbarModel.find({
            adminId: user._id,
          });
        }

        if (userPersonel) {
          dataGet = await ResidBeAnbarModel.find({
            adminId: userPersonel.adminUser,
          });
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
    } catch (err) {
      next(err);
    }
  }

  async decraseMojodiGet(req, res, next) {
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
          dataGet = (await HavaleAzAnbarModel.find({})).reverse();
        }

        if (userPersonel) {
          if (userPersonel.access == "1" || userPersonel.access == "2") {
            dataGet = (await HavaleAzAnbarModel.find({})).reverse();
          } else {
            dataGet = (await HavaleAzAnbarModel.find()).reverse();
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
    } catch (err) {
      next(err);
    }
  }

  async decraseMojodiAdminConfirm(req, res, next) {
    try {
      const { _id } = req.body;
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
          const dataConf = await HavaleAzAnbarModel.findOneAndUpdate(
            {
              _id,
            },
            {
              status: "true",
              statusSignImage: user.signImage,
            }
          );
        }

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

  async decraseMojodiAnbarConfirm(req, res, next) {
    try {
      const { _id, tokenTak } = req.body;
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
        const products = await HavaleAzAnbarModel.findOne({
          _id,
        });

        if (userPersonel) {
          const getTimeSet = await fetch("https://api.keybit.ir/time/");
          const getDataTime = await getTimeSet.json();

          console.log(products);

          const fetchDataMande = await fetch(
            baseUrl(`/services/Base/ApiService/CreateSale`),
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${tokenTak}`,
                "Content-Type": "application/json",
                "Abp.TenantId": "1",
              },
              body: JSON.stringify({
                StoreId: 104,
                FiscalYear: shamsi.gregorianToJalali(new Date())[0].toString(),

                // TollOverWorthCost: products.products.reduce(
                //   (accumulator, transaction) => {
                //     return (
                //       ((accumulator +
                //         parseInt(!transaction.price ? 0 : transaction.price) *
                //           parseInt(transaction.count)) *
                //         10) /
                //       100
                //     );
                //   },
                //   0
                // ),
                Price: products.products.reduce((accumulator, transaction) => {
                  return (
                    accumulator +
                    parseInt(!transaction.price ? 0 : transaction.price) *
                      parseInt(transaction.count)
                  );
                }, 0),
                Amount: products.products.reduce((accumulator, transaction) => {
                  return (
                    accumulator +
                    parseInt(!transaction.price ? 0 : transaction.price) *
                      parseInt(transaction.count) +
                    ((accumulator +
                      parseInt(!transaction.price ? 0 : transaction.price) *
                        parseInt(transaction.count)) *
                      10) /
                      100
                  );
                }, 0),
                DocDate: getDataTime.date.full.official.usual.en,
                ProcessID: "1",
                TransferSerialNo: products.code,
                SaleDtls: products.products.map((i) => ({
                  FiscalYear: shamsi
                    .gregorianToJalali(new Date())[0]
                    .toString(),
                  GoodsID: i.code,
                  DocDate: getDataTime.date.full.official.usual.en,
                  Quantity: parseFloat(i.count),
                  GoodsPrice: parseFloat(i.price),
                })),
                Customer: {
                  //Id: "11301" + " " + products.buyerCode,
                  AcntCode: "11301" + " " + products.reciverCode,
                  FullName: products.buyerName,
                  Email: "-",
                  Phone: products.phone,
                  FirstName: products.buyerName,
                  LastName: "",
                  NationalID: products.nationalCode,
                  BirthDate: "",
                  AccountNumber: "",
                },
              }),
            }
          );

          const responseDataMande = await fetchDataMande.json();

          console.log(responseDataMande);

          if (responseDataMande.success == true) {
            const dataConf = await HavaleAzAnbarModel.findOneAndUpdate(
              {
                _id,
              },
              {
                statusOpUserAdminAnbardar: "true",
                statusOpUserAdminSignImageAnbardar: userPersonel.signImage,
              }
            );
            res.status(202).json({
              status: 202,
              message: "اطلاعات بروز شد",

              createDate: new Date().toLocaleDateString("fa-ir"),
            });
          } else {
            res.status(400).json({
              status: 400,
              err: responseDataMande.error.message,
              message: "اطلاعات بروز نشد",
              createDate: new Date().toLocaleDateString("fa-ir"),
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

  async decraseMojodi(req, res, next) {
    try {
      const { _id, newVal } = req.body;
      try {
        const dataPrd = await ProductModel.findOne({ _id });

        const newMojodi =
          parseInt(
            !dataPrd.mainCount
              ? 0
              : dataPrd.mainCount == "NaN"
              ? 0
              : dataPrd.mainCount
          ) - parseInt(newVal);

        const newMojodiInput = Math.abs(
          parseInt(
            !dataPrd.exportCount
              ? 0
              : dataPrd.exportCount == "NaN"
              ? 0
              : dataPrd.exportCount == ""
              ? 0
              : dataPrd.exportCount
          ) - parseInt(newVal)
        );

        const dataConf = await ProductModel.findOneAndUpdate(
          {
            _id,
          },
          {
            exportCount: newMojodiInput,
            mainCount: newMojodi,
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

    const userCustomer = await CustomersModel.findOne({
      _id: verifyResult.userID,
    });

    let dataGet = [];

    if (user) {
      dataGet = await ProductModel.find({
        adminUser: user._id,
      });
    }
    if (userPersonel) {
      dataGet = await ProductModel.find({
        adminUser: userPersonel.adminUser,
      });
    }

    if (userCustomer) {
      dataGet = await ProductModel.find({
        adminUser: userCustomer.administrator,
      });
    }
    return dataGet;
  }

  async editHavaleOrder(req, res, next) {
    try {
      const { _id, reciver, exitRes, location, carNum } = req.body;

      const dataConf = await HavaleAzAnbarModel.findOneAndUpdate(
        {
          _id,
        },
        {
          exitRes,
          reciver,
          location,
          carNumber: carNum,
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
  }

  async addChildToParent(req, res, next) {
    try {
      const { child, parent } = req.body;

      // const objectIdParent = new Types.ObjectId(parent);
      // const objectIdChild = new Types.ObjectId(child);

      let newArray = [];

      const findChild = await ProductModel.findOne({ _id: child });

      const newChildParent = await findChild.parent;
      await newArray.push(...newChildParent, parent);
      const addChild = await ProductModel.findOneAndUpdate(
        { _id: child },
        {
          parent: newArray,
        }
      );

      res.status(200).json({
        status: 200,

        message: "فرزند به والد الصاق شد",
        createDate: new Date().toLocaleDateString("fa-ir"),
      });
    } catch (error) {
      next(error);
    }
  }

  async getCountOfProduct(req, res, next) {
    try {
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
        phone: verifyResult.phone,
      });
      const dataGet = await ProductModel.find({
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

  async deleteProduct(req, res, next) {
    try {
      const { _id } = req.body;

      try {
        const dataGet = await ProductModel.findOneAndDelete({ _id });

        res.status(202).json({
          status: 202,
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

module.exports = { ProductController: new ProductController() };
