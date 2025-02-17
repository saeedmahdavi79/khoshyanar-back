const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  roleName: { type: String },
  access: { type: String },
  des: { type: String },
  adminUser: { type: String },
  adminUserName: { type: String },

  createDate: {
    type: String,
    default: new Date(),
  },
});
const RoleModel = mongoose.model("RoleSchema", RoleSchema);

module.exports = { RoleModel };
