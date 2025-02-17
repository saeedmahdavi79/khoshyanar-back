const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  email: { type: String },
  birthDate: { type: String },
  userName: { type: String },
  password: { type: String },
  phone: { type: String },
  role: {
    type: String,
    default: "admin",
    enum: [
      "admin",
      "user",
      "office",
      "tasks",
      "prodution",
      "financial",
      "marketing",
    ],
  },
  name: { type: String },
  lastName: { type: String },
  verified: { type: String },
  company: { type: String },
  activePlan: { type: String },
  activePlanName: { type: String },
  activePlanLenght: { type: String },
  activePlanExpireTime: { type: String },
  adminId: { type: String },
  access: { type: String },
  signCode: { type: String },

  type: { type: String },
  activePackage: { type: String },
  bills: { type: [], default: [] },
  createDate: {
    type: String,
    default: new Date().getTime(),
  },
});
const UserModel = mongoose.model("UserSchema", UsersSchema);

module.exports = { UserModel };
