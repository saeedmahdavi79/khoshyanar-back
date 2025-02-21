const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserPersonelSchema = new Schema({
  id: { type: String },
  sex: { type: String },
  name: { type: String },
  lastName: { type: String },
  userName: { type: String },
  password: { type: String },
  phone: { type: String },
  birth: { type: String },
  email: { type: String },
  type: { type: String },
  role: { type: String },
  access: { type: String },
  signCode: { type: String },
  signStatus: { type: String },
  signRole: { type: String },
  signImage: { type: String },
  adminUser: { type: String },
  adminUserName: { type: String },
  activePlan: { type: String },
  activePlanName: { type: String },
  activePlanLenght: { type: String },
  activePlanExpireTime: { type: String },
  month: {
    type: String,
  },
  year: {
    type: String,
  },
  day: {
    type: String,
  },

  createDate: {
    type: String,
    default: new Date().toLocaleDateString("fa-ir"),
  },
});
const UserPersonelModel = mongoose.model(
  "UserPersonelSchema",
  UserPersonelSchema
);

module.exports = { UserPersonelModel };
