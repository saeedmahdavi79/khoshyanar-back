const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PishbiniToolidSchema = new Schema({
  count: { type: String },
  title: { type: String },
  child: { type: JSON },
  month: { type: String },
  year: { type: String },
  formulaId: { type: String },
  formulaLabel: { type: String },
  monthLabel: { type: String },

  adminId: { type: String },
  yearFinancial: { type: String },
  createDate: {
    type: String,
    default: new Date().toLocaleDateString("fa-ir"),
  },
});
const PishbiniToolidModel = mongoose.model(
  "PishbiniToolidSchema",
  PishbiniToolidSchema
);

module.exports = { PishbiniToolidModel };
