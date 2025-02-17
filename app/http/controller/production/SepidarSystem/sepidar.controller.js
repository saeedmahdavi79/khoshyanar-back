const { SEPIDAR_BASE_URL } = require("../../../../utils/constant");
const Controller = require("../../controller");

//Public Class
class SepidarController extends Controller {
  async getAllProducts(req, res, next) {
    try {
      try {
        try {
          const getData = await fetch(
            SEPIDAR_BASE_URL + "/GetAllProductOrder",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                Username: "webuser",
                Password: "Solar@123",
              }),
            }
          );
          const dataProducts = await getData.json();
          res.status(200).json({
            status: 200,
            requestDate: new Date(),
            dataProducts,
            message: "محصول ها دریافت شدند !",
          });
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }
  async getAllFormula(req, res, next) {
    try {
      try {
        try {
          const getData = await fetch(
            SEPIDAR_BASE_URL + "/GetAllProductFormula",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                Username: "webuser",
                Password: "Solar@123",
              }),
            }
          );
          const dataFormula = await getData.json();
          res.status(200).json({
            status: 200,
            requestDate: new Date(),
            dataFormula,
            message: "محصول ها دریافت شدند !",
          });
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { SepidarController: new SepidarController() };
