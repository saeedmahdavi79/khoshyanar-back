const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormulaSchema = new Schema({
  title: { type: String },
  adminId: { type: String },
  childs: { type: JSON },
  month: { type: String },
  year: { type: String },
  createDate: { type: String, default: new Date().toLocaleDateString("fa-IR") },
});

const FormulaModel = mongoose.model("FormulaSchema", FormulaSchema);
module.exports = { FormulaModel };
