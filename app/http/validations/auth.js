const { body } = require("express-validator");
function registerValidator() {
  return [
    body("phone")
      .notEmpty()
      .isLength({ min: 11, max: 11 })
      .withMessage(
        "تعداد کاراکتر ها برای موبایل باید 11 عدد باشد"
      ),

  ];
}
function otpCheckValidator() {
  return [
    body("code")
      .notEmpty()
      .isLength({ min: 5, max: 5 })
      .withMessage(
        "تعداد کاراکتر ها برای کد تایید باید 5 عدد باشد"
      ),

  ];
}

module.exports = { registerValidator,otpCheckValidator };
