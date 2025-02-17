const { AdsModel } = require("../../../models/ads/ads.model");
const Controller = require("../controller");

//Public Class
class AdsController extends Controller {
  async createAd(req, res, next) {
    try {
      const {
        addLocation,
        addName,
        city,
        lat,
        lon,
        email,
        phone,
        postalCode,
        des,
        view,
        userId,
        cat,
        mainPicture,
      } = req.body;

      try {
        const createAds = await AdsModel.create({
          addLocation,
          addName,
          city,
          lat,
          lon,
          email,
          phone,
          postalCode,
          des,
          view,
          userId,
          cat,
          mainPicture,
        });

        res.status(202).json({
          status: 202,
          message: ` add : ${addName} created`,
          createDate: new Date(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async getAds(req, res, next) {
    try {
      try {
        const dataGet = await AdsModel.find();
        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: { dataGet },
          message: "Ads Removed !",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async removeAd(req, res, next) {
    try {
      const { _id } = req.body;
      try {
        const dataFind = await AdsModel.findOne({
          _id,
        });
        if (dataFind) {
          const dataGet = await AdsModel.findOneAndDelete({
            _id,
          });
          res.status(200).json({
            status: 200,
            requestDate: new Date(),

            message: "Ads Removed !",
          });

          if (!dataFind) {
            res.status(200).json({
              status: 200,
              requestDate: new Date(),
              message: "Ads Not Exisist !",
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
module.exports = { AdsController: new AdsController() };
