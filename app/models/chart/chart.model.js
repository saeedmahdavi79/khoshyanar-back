const { Schema, Types, model } = require("mongoose");

const autopopulate = require("mongoose-autopopulate");

const ChartSchema = new Schema(
  {
    title: { type: String },
    des: { type: String },
    key: { type: String },
    icon: { type: String },
    userName: { type: String },
    userId: { type: String },
    adminUser: { type: String },
    adminUserName: { type: String },
    slug: { type: String, index: true },
    parent: { type: Types.ObjectId, ref: "Chart" },
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

ChartSchema.virtual("children", {
  ref: "Chart",
  localField: "_id",
  foreignField: "parent",
  autopopulate: true,
});

ChartSchema.plugin(autopopulate);
ChartSchema.pre("save", function (next) {
  this.key = this.get("_id");
  next();
});
const ChartModel = model("Chart", ChartSchema);

module.exports = ChartModel;
