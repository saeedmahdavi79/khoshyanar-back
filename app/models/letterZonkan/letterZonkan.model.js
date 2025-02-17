const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ZonkanSchema = new Schema({
  zonkanName: { type: String },
  des: { type: String },
  adminUser: { type: String },
  adminUserName: { type: String },
  createDate: {
    type: String,
    default: new Date(),
  },
});
const ZonkanModel = mongoose.model("ZonkanSchema", ZonkanSchema);

module.exports = { ZonkanModel };
