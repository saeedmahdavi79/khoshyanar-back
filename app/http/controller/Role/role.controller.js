const { UserModel } = require("../../../models/auth/auth.model");
const { RoleModel } = require("../../../models/roles/role.model");
const { verifyAccessToken } = require("../../../modules/functions");
const Controller = require("../controller");

//Public Class
class RoleController extends Controller {
  async createRole(req, res, next) {
    try {
      const { roleName, access, des } = req.body;

      try {
        const authorization = req.headers.authorization;
        const [bearer, token] = authorization.split(" ");

        const verifyResult = await verifyAccessToken(token);
        const user = await UserModel.findOne({
          phone: verifyResult.phone,
        });

        const createRole = await RoleModel.create({
          roleName,
          access,
          des,
          adminUser: user._id,
          adminUserName: user.name + " " + user.lastName,
        });

        res.status(202).json({
          status: 202,
          message: ` role : ${roleName} created`,
          createDate: new Date(),
        });
      } catch (error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  async getRole(req, res, next) {
    try {
      try {
        const dataGet = await RoleModel.find();
        res.status(200).json({
          status: 200,
          requestDate: new Date(),
          data: { dataGet },
          message: "Roles Recived !",
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

  async removeRole(req, res, next) {
    try {
      const { _id } = req.body;
      try {
        const dataFind = await RoleModel.findOne({
          _id,
        });
        if (dataFind) {
          const dataGet = await RoleModel.findOneAndDelete({
            _id,
          });
          res.status(200).json({
            status: 200,
            requestDate: new Date(),

            message: "Roles Removed !",
          });

          if (!dataFind) {
            res.status(200).json({
              status: 200,
              requestDate: new Date(),
              message: "Roles Not Exisist !",
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
module.exports = { RoleController: new RoleController() };
