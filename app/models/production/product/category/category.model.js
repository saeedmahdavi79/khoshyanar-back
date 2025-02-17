const { Schema, Types, model } = require("mongoose");

const autopopulate = require("mongoose-autopopulate");

const ProductCategorySchema = new Schema(
  {
    title: { type: String },
    des: { type: String },
    key: { type: String },
    icon: { type: String },
    adminId: { type: String },
    slug: { type: String, index: true },
    parent: { type: Types.ObjectId, ref: "Category" },
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

ProductCategorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
  autopopulate: true,
});

ProductCategorySchema.plugin(autopopulate);
ProductCategorySchema.pre("save", function (next) {
  this.key = this.get("_id");
  next();
});
const ProductCatModel = model("Category", ProductCategorySchema);

module.exports = ProductCatModel;
