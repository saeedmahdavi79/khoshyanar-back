const createHttpError = require("http-errors");
// const JWT = require("jsonwebtoken");
// const { ACCESS_SECRET_KEY } = require("../../utils/constant");
// const { getCookieList } = require("../../utils/getCookie");
const { verifyAccessToken } = require("../../modules/functions");
const { UserModel } = require("../../models/auth/auth.model");
const { VisitorModel } = require("../../models/visitor/vistior.model");
const { UserPersonelModel } = require("../../models/users/users.model");

async function bearerToken(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw createHttpError.Unauthorized("کاربر احراز هویت نشده است");
      // return next();
    } else {
      const [bearer, token] = authorization.split(" ");

      if (bearer && bearer.toLowerCase() == "bearer") {
        if (token) {
          const verifyResult = await verifyAccessToken(token);
          const user = await UserModel.findOne({ phone: verifyResult.phone });
          const userLast = await UserPersonelModel.findOne({
            phone: verifyResult.phone,
          });

          if (!user && !userLast)
            throw createHttpError.Unauthorized(
              "شما دسترسی کافی برای انجام این عملیات را ندارید"
            );
          return next();
        } else {
          return createHttpError.Unauthorized(
            "شما دسترسی کافی برای انجام این عملیات را ندارید"
          );
        }
      }
    }
  } catch (error) {
    next(error);
  }
}

async function bearerTokenVisitor(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw createHttpError.Unauthorized("کاربر احراز هویت نشده است");
      // return next();
    } else {
      const [bearer, token] = authorization.split(" ");

      if (bearer && bearer.toLowerCase() == "bearer") {
        if (token) {
          const verifyResult = await verifyAccessToken(token);
          const user = await VisitorModel.findOne({
            email: verifyResult.email,
          });

          if (!user)
            throw createHttpError.Unauthorized(
              "شما دسترسی کافی برای انجام این عملیات را ندارید"
            );
          return next();
        } else {
          return createHttpError.Unauthorized(
            "شما دسترسی کافی برای انجام این عملیات را ندارید"
          );
        }
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  bearerToken,
  bearerTokenVisitor,
};
