const { Schema, Types, model } = require("mongoose");

const autopopulate = require("mongoose-autopopulate");

const OrganizitonChartSchema = new Schema(
  {
    title: { type: String },
    actor: { type: String },
    key: { type: String },
    icon: { type: String },
    adminId: { type: String },
    slug: { type: String, index: true },
    parent: { type: Types.ObjectId, ref: "OrgChart" },
    parents: { type: [Types.ObjectId], default: [] },
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
      default: new Date().toLocaleDateString("fa-IR"),
    },
  },
  {
    versionKey: false,
    id: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

OrganizitonChartSchema.virtual("children", {
  ref: "OrgChart",
  localField: "_id",
  foreignField: "parent",
  autopopulate: true,
});

OrganizitonChartSchema.plugin(autopopulate);
OrganizitonChartSchema.pre("save", function (next) {
  this.key = this.get("_id");
  next();
});
const OrganizitonChartModel = model("OrgChart", OrganizitonChartSchema);

module.exports = OrganizitonChartModel;
