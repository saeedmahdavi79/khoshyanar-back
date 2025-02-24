const { UserModel } = require("../../../models/auth/auth.model");
const { CustomersModel } = require("../../../models/customers/customers.model");
const ProductModel = require("../../../models/production/product/product.model");
const { SourceModel } = require("../../../models/production/source/source.model");
const { UserPersonelModel } = require("../../../models/users/users.model");
const { verifyAccessToken } = require("../../../modules/functions");
const { sha256pass } = require("../../../utils/access");
const { baseUrl } = require("../../../utils/baseUrl");
const Controller = require("../controller");
const randomUsernameGenerator = require("random-username-generator");
var shamsi = require("shamsi-date-converter");

//Public Class
class SyncDataController extends Controller {

  async getPersonelsSync(req, res, next) {
    try {
      const { tokenTakro } = req.body;
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
        phone: verifyResult.phone,
      });

      const fetchData = await fetch(baseUrl("/services/Base/ApiService/GetPersennels?FiscalYear=1403&MaxResultCount=10000"), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenTakro}`,
          "Content-Type": "application/json",
          "Abp.TenantId": "1"
        }
      });

      const responseData = await fetchData.json();

      const uniqueObjects = Array.from(new Map(responseData.result.map(item => [item.personnelID, item])).values());
      const hashedPassword = await sha256pass("123456");

      const promises = uniqueObjects.map(async (data) => {
        try {
          const userName = `user_${data.personnelID}`; 

          // بررسی شرایط برای دسترسی و رمز عبور
          const updateData = {
            name: data.firstName,
            lastName: data.lastName,
            sex: data.gender == "1" ? "مرد" : "زن",
            birth: data.birthDate,
            id: data.personnelID,
            userName: userName,
            adminUser: user._id,
            adminUserName: user.name + " " + user.lastName,
            email: data.email,
            phone: data.mobile,
          };

          // اگر access برابر با 6 نیست، آن را تغییر ندهید
          if (data.access === "6") {
            updateData.access = "6";
          }

          // اگر رمز عبور برابر با "123456" نیست، آن را تغییر ندهید
          const existingUser = await UserPersonelModel.findOne({ id: data.personnelID });
          if (existingUser && existingUser.password === hashedPassword) {
            updateData.password = hashedPassword;
          }

          await UserPersonelModel.updateOne({ id: data.personnelID }, updateData, { upsert: true }); 
        } catch (error) {
          console.error('Error saving data:', error);
        }
      });

      await Promise.all(promises);

      res.status(200).json({
        status: 200,
        requestDate: new Date(),
        message: "Sync Successfully !",
      });
    } catch (error) {
      next(error);
    }
  }

  async getCustomerSync(req, res, next) {
    try {
        const { tokenTakro } = req.body;
        const authorization = req.headers.authorization;
        const [bearer, token] = authorization.split(" ");

        const verifyResult = await verifyAccessToken(token);
        const user = await UserModel.findOne({
            phone: verifyResult.phone,
        });

        const fetchData = await fetch(baseUrl("/services/Base/ApiService/GetCustomers?FiscalYear=1403&MaxResultCount=1000000"), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${tokenTakro}`,
                "Content-Type": "application/json",
                "Abp.TenantId": "1"
            }
        });

        const responseData = await fetchData.json();




        // فیلتر کردن داده‌ها بر اساس خالی بودن فیلدها
        const CustomersData = responseData.result.filter((i) => {
            return i.id.startsWith("05")
             && 
                   i.firstName && 
                   i.lastName && 
                   i.fullName && 
                   i.acntName;
        });

        const uniqueObjects = Array.from(new Map(CustomersData.map(item => [item.id, item])).values());
        const hashedPassword = "123456";

        const promises = uniqueObjects.map(async (data) => {
            try {
                const userName = `user_${data.id}`;

                // بررسی شرایط برای دسترسی و رمز عبور
                const updateData = {
                    name: data.fullName || data.acntName || (data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : "-"),
                    financialCode: data.acntCode,
                    nationalCode: (data.nationalID && data.nationalID !== '') ? data.nationalID : (data.nationalIdentity && data.nationalIdentity !== '') ? data.nationalIdentity : "-",
                    birthDate: data.birthDate == '          ' ? "-" : data.birthDate,
                    address: data.address,
                    phone: data.mobileNumber,
                    sabtNumber: data.companyRegisterNo,
                    type: "1",
                    id: data.id,
                    state: "",
                    city:"",
                    lat:"35.7219",
                    lon:"51.3347",
                    access:"7",
                    month: shamsi.gregorianToJalali(new Date())[1],
                                year: shamsi.gregorianToJalali(new Date())[0],
                                day: shamsi.gregorianToJalali(new Date())[2],
                    password: hashedPassword,
                    userName: userName,
                    administrator: user._id,
                    adminUser: user._id,
                    adminUserName: user.name + " " + user.lastName,
                };

                // اگر رمز عبور برابر با "123456" نیست، آن را تغییر ندهید
                const existingUser = await CustomersModel.findOne({ id: data.id });
                if (existingUser && existingUser.password === hashedPassword) {
                    updateData.password = hashedPassword;
                }

                await CustomersModel.updateOne({ id: data.id }, updateData, { upsert: true });
            } catch (error) {
                console.error('Error saving data:', error);
            }
        });

        await Promise.all(promises);

        res.status(200).json({
            status: 200,
            requestDate: new Date(),
            message: "Sync Successfully !",
        });
    } catch (error) {
        next(error);
    }
}


async fetchStoreIds(tokenTakro) {
  const fetchData = await fetch(baseUrl("/services/Base/ApiService/GetStores?FiscalYear=1403"), {
      method: "GET",
      headers: {
          Authorization: `Bearer ${tokenTakro}`,
          "Content-Type": "application/json",
          "Abp.TenantId": "1"
      }
  });

  const responseData = await fetchData.json();
  return responseData.result.map(store => store.storeId); // فرض کنید storeId در آبجکت store وجود دارد
}

async getProductsSync(req, res, next) {
  try {
      const { tokenTakro } = req.body;
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
          phone: verifyResult.phone,
      });

        const fetchData = await fetch(baseUrl(`/services/Base/ApiService/GetGoodsInfo?FiscalYear=1403&MaxResultCount=1000000&StoreId=104`), {
          method: "GET",
          headers: {
              Authorization: `Bearer ${tokenTakro}`,
              "Content-Type": "application/json",
              "Abp.TenantId": "1"
          }
      });

      const responseData = await fetchData.json();

      

      const promises = responseData.result.map(async (data) => {
          try {
              const updateData = {
                  title: !data.goodsName ? "-" : data.goodsName,
                  code: data.goodsId,
                  productCatId: "677630bf520b727f4ffb7f3a",
                  productCatName: "دسته بندی محصولات",
                  erpCount: 0,
                  vahed: data.unitName,
                  status: "1",
                  mainCount: data.quantity,
                  machineCount: 0,
                  price: data.price,
                  month: shamsi.gregorianToJalali(new Date())[1],
                  year: shamsi.gregorianToJalali(new Date())[0],
                  day: shamsi.gregorianToJalali(new Date())[2],
                  adminUser: user._id,
                  adminUserName: user.name + " " + user.lastName,
                  sourceId: "104",
                  sourceName: "انبار محصولات" // ذخیره storeId
              };

              await ProductModel.updateOne({ code: data.goodsId }, updateData, { upsert: true });
          } catch (error) {
              console.error('Error saving data:', error);
          }
      });

      await Promise.all(promises);

      

    //   const fetchData2 = await fetch(baseUrl(`/services/Base/ApiService/GetGoodsInfo?FiscalYear=1403&MaxResultCount=1000000&StoreId=105`), {
    //     method: "GET",
    //     headers: {
    //         Authorization: `Bearer ${tokenTakro}`,
    //         "Content-Type": "application/json",
    //         "Abp.TenantId": "1"
    //     }
    // });

    // const responseData2 = await fetchData2.json();

    // const promises2 = responseData2.result.map(async (data) => {
    //     try {
    //         const updateData = {
    //             title: !data.goodsName ? "-" : data.goodsName,
    //             code: data.goodsId,
    //             productCatId: "677630bf520b727f4ffb7f3a",
    //             productCatName: "دسته بندی محصولات",
    //             erpCount: 0,
    //             vahed: data.unitName,
    //             status: "1",
    //             mainCount: data.quantity,
    //             machineCount: 0,
    //             price: data.price,
    //             month: shamsi.gregorianToJalali(new Date())[1],
    //             year: shamsi.gregorianToJalali(new Date())[0],
    //             day: shamsi.gregorianToJalali(new Date())[2],
    //             adminUser: user._id,
    //             adminUserName: user.name + " " + user.lastName,
    //             sourceId: "105" // ذخیره storeId
    //         };

    //         await ProductModel.updateOne({ code: data.goodsId }, updateData, { upsert: true });
    //     } catch (error) {
    //         console.error('Error saving data:', error);
    //     }
    // });

    // await Promise.all(promises2);

    

      res.status(200).json({
        status: 200,
        requestDate: new Date(),
        
        message: "Sync Successfully !",
    });

     
  } catch (error) {
      next(error);
  }
}


async getStoresSync(req, res, next) {
  try {
      const { tokenTakro } = req.body;
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(" ");

      const verifyResult = await verifyAccessToken(token);
      const user = await UserModel.findOne({
          phone: verifyResult.phone,
      });

      const fetchData = await fetch(baseUrl("/services/Base/ApiService/GetStores?FiscalYear=1403"), {
          method: "GET",
          headers: {
              Authorization: `Bearer ${tokenTakro}`,
              "Content-Type": "application/json",
              "Abp.TenantId": "1"
          }
      });

      const responseData = await fetchData.json();

   
     
     


      // فیلتر کردن داده‌ها بر اساس خالی بودن فیلدها
      // const CustomersData = responseData.result.filter((i) => {
      //     return i.id.startsWith("05")
      //     //  && 
      //     //        i.firstName && 
      //     //        i.lastName && 
      //     //        i.fullName && 
      //     //        i.acntName;
      // });

      // const uniqueObjects = Array.from(new Map(CustomersData.map(item => [item.id, item])).values());
      // const hashedPassword = await sha256pass("123456");

      const promises = responseData.result.map(async (data) => {
          try {
              const userName = `user_${data.id}`;

              // بررسی شرایط برای دسترسی و رمز عبور
              const updateData = {
                sourceName: !data.storeName ? "-"  : data.storeName,
                id: data.storeId,
                
                  month: shamsi.gregorianToJalali(new Date())[1],
                              year: shamsi.gregorianToJalali(new Date())[0],
                              day: shamsi.gregorianToJalali(new Date())[2],
                 
                  adminUser: user._id,
                  adminUserName: user.name + " " + user.lastName,
              };

              // اگر رمز عبور برابر با "123456" نیست، آن را تغییر ندهید
             

              await SourceModel.updateOne({ id: data.storeId }, updateData, { upsert: true });
          } catch (error) {
              console.error('Error saving data:', error);
          }
      });

      await Promise.all(promises);

      res.status(200).json({
          status: 200,
          requestDate: new Date(),
          message: "Sync Successfully !",
      });
  } catch (error) {
      next(error);
  }
}

async getStates(req, res, next) {
  try {
 
    const getStates = await fetch("https://www.iran-locations-api.ir/api/v1/fa/states" , {
      method: "GET"
    });
    const getStatesData = await getStates.json()

    

      res.status(200).json({
          status: 200,
          getStatesData,
          requestDate: new Date(),
          message: "State's Get Successfully !",
      });
  } catch (error) {
      next(error);
  }
}

async getCitys(req, res, next) {
  try {

    const {state} = req.body; 
 
    const getCitys = await fetch("https://iran-locations-api.ir/api/v1/fa/cities?state=" + state , {
      method: "GET"
    });
    const getCityData = await getCitys.json()


    
    

      res.status(200).json({
          status: 200,
          getCityData,
          requestDate: new Date(),
          message: "City's Get Successfully !",
      });
  } catch (error) {
      next(error);
  }
}

}
module.exports = { SyncDataController: new SyncDataController() };
