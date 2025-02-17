const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FYSchema = new Schema({
  fyName: { type: String },
  fyDes: { type: String },
  fyValue: { type: String },
  activeYear: { type: String },
  adminId: { type: String },

  createDate: {
    type: String,
    default: new Date(),
  },
});
const FYModel = mongoose.model("FYSchema", FYSchema);

module.exports = { FYModel };
