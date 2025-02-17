const { Schema, Types, model } = require("mongoose");
const autopopulate = require("mongoose-autopopulate");
const ProductSchema = new Schema(
  {
    title: { type: String },
    code: { type: String },
    formulaId: { type: String },
    formulaName: { type: String },
    machineCount: { type: String },
    productCatId: { type: String },
    productCatName: { type: String },
    erpCount: { type: String },
    vahed: { type: String },
    vahed2: { type: String },
    status: { type: String },
    firstCount: { type: String },
    entryCount: { type: String },
    mainCount: { type: String },
    exportCount: { type: String },
    price: { type: String },
    sourceId: { type: String },
    adminUser: { type: String },
    adminUserName: { type: String },

    sourceName: { type: String },
    des: { type: String },
    key: { type: String },
    icon: { type: String },
    slug: { type: String, index: true },
    parent: { type: [Types.ObjectId], default: undefined, ref: "Product" },
    parents: {
      type: [Types.ObjectId],
      default: [],
    },

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

ProductSchema.virtual("children", {
  ref: "Product",
  localField: "_id",
  foreignField: "parent",
  autopopulate: true,
});

ProductSchema.plugin(autopopulate);
ProductSchema.pre("save", async function (next) {
  this.key = this.get("_id");
  next();
});

const ProductModel = model("Product", ProductSchema);

module.exports = ProductModel;
