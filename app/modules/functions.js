const createHttpError = require("http-errors");
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require("../utils/constant");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/auth/auth.model");
const fs = require("fs");
const path = require("path");
const sha256 = require("sha256");
const { VisitorModel } = require("../models/visitor/vistior.model");
const { UserPersonelModel } = require("../models/users/users.model");
const { CustomersModel } = require("../models/customers/customers.model");
function numberRandomGenerator() {
  return Math.floor(Math.random() * 90000 + 10000);
}

function SignAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const userLast = await UserPersonelModel.findById(userId);


    
    

    if (!user) {
      const payload = {
        phone: userLast.phone,
        userID: userLast._id,
      };
      const secret = ACCESS_SECRET_KEY;
      const option = {
        expiresIn: "1h",
      };

      JWT.sign(payload, secret, option, (err, token) => {
        if (err) createHttpError.InternalServerError("خطای داخلی سرور");

        resolve(token);
      });
    }
    if (!userLast) {
      const payload = {
        phone: user.phone,
        userID: user._id,
      };
      const secret = ACCESS_SECRET_KEY;
      const option = {
        expiresIn: "1h",
      };

      JWT.sign(payload, secret, option, (err, token) => {
        if (err) createHttpError.InternalServerError("خطای داخلی سرور");

        resolve(token);
      });
    }
    // if (!user || !userLast) {
    //   const payload = {
    //     userName: userCustomer.userName,
    //     userID: userCustomer._id,
    //   };
    //   const secret = ACCESS_SECRET_KEY;
    //   const option = {
    //     expiresIn: "1h",
    //   };

    //   JWT.sign(payload, secret, option, (err, token) => {
    //     if (err) createHttpError.InternalServerError("خطای داخلی سرور");

    //     resolve(token);
    //   });
    // }
  });
}

function SignRefreshToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const userLast = await UserPersonelModel.findById(userId);

    if (!user) {
      const payload = {
        phone: userLast.phone,
        userID: userLast._id,
      };
      const secret = ACCESS_SECRET_KEY;
      const option = {
        expiresIn: "1h",
      };

      JWT.sign(payload, secret, option, (err, token) => {
        if (err) createHttpError.InternalServerError("خطای داخلی سرور");

        resolve(token);
      });
    }
    if (!userLast) {
      const payload = {
        phone: user.phone,
        userID: user._id,
      };
      const secret = ACCESS_SECRET_KEY;
      const option = {
        expiresIn: "1h",
      };

      JWT.sign(payload, secret, option, (err, token) => {
        if (err) createHttpError.InternalServerError("خطای داخلی سرور");

        resolve(token);
      });
    }
  });
}

function SignAccessTokenCustomer(userId) {
  return new Promise(async (resolve, reject) => {
  const userCustomer = await CustomersModel.findOne(userId);


    
    

    
      const payload = {
        userName: userCustomer.userName,
        userID: userCustomer._id,
      };
      const secret = ACCESS_SECRET_KEY;
      const option = {
        expiresIn: "1h",
      };

      JWT.sign(payload, secret, option, (err, token) => {
        if (err) createHttpError.InternalServerError("خطای داخلی سرور");

        resolve(token);
      });
    
  });
}

function SignAccessTokenVisitor(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await VisitorModel.findById(userId);

    const payload = {
      email: user.email,
      userID: user._id,
    };
    const secret = ACCESS_SECRET_KEY;
    const option = {
      expiresIn: "1h",
    };

    JWT.sign(payload, secret, option, (err, token) => {
      if (err) createHttpError.InternalServerError("خطای داخلی سرور");

      resolve(token);
    });
  });
}

function SignRefreshTokenVisitor(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await VisitorModel.findById(userId);

    const payload = {
      email: user.email,
      userID: user._id,
    };
    const option = {
      expiresIn: "1y",
    };
    JWT.sign(payload, REFRESH_SECRET_KEY, option, (err, token) => {
      if (err) reject(createError.InternalServerError("Server error"));
      resolve(token);
    });
  });
}

function verifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    const result = JWT.decode(token, REFRESH_SECRET_KEY);
    if (!result)
      createHttpError.Unauthorized(
        "You don't have permission to access this api , please login"
      );
    resolve(result);
  });
}

function verifyAccessToken(token) {
  return new Promise((resolve, reject) => {
    const result = JWT.decode(token, ACCESS_SECRET_KEY);
    if (!result)
      createHttpError.Unauthorized(
        "You don't have permission to access this api , please login"
      );
    resolve(result);
  });
}

function createdVideoUploadPath() {
  let d = new Date();
  const Year = "" + d.getFullYear();
  const Month = "" + d.getMonth();
  const Day = "" + d.getDate();
  const uploadPath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "upload",
    "video",
    Year,
    Month,
    Day
  );
  fs.mkdirSync(uploadPath, { recursive: true });
  return path.join("public", "upload", "video", Year, Month, Day);
}

function createdImageUploadPath() {
  let d = new Date();
  const Year = "" + d.getFullYear();
  const Month = "" + d.getMonth();
  const Day = "" + d.getDate();
  const uploadPath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "upload",
    "image",
    Year,
    Month,
    Day
  );
  fs.mkdirSync(uploadPath, { recursive: true });
  return path.join("public", "upload", "image", Year, Month, Day);
}

function createdFileUploadPath() {
  let d = new Date();
  const Year = "" + d.getFullYear();
  const Month = "" + d.getMonth();
  const Day = "" + d.getDate();
  const uploadPath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "upload",
    "files",
    Year,
    Month,
    Day
  );
  fs.mkdirSync(uploadPath, { recursive: true });
  return path.join("public", "upload", "files", Year, Month, Day);
}

function sha256pass(password) {
  try {
    const passworded = sha256(password);

    return passworded;
  } catch (error) {
    return error;
  }
}

module.exports = {
  numberRandomGenerator,
  SignAccessToken,
  SignRefreshToken,
  verifyRefreshToken,
  createdVideoUploadPath,
  createdImageUploadPath,
  createdFileUploadPath,
  verifyAccessToken,
  sha256pass,
  SignAccessTokenVisitor,
  SignRefreshTokenVisitor,
  SignAccessTokenCustomer
};
