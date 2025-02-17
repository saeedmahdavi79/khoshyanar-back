const { adminRouted } = require("./routes/admin/admin");
const { adsRouted } = require("./routes/ads/ads");
const { authRouted } = require("./routes/auth/auth");
const { calenderRouted } = require("./routes/calender/calender");
const { chatRouthed } = require("./routes/chat/chat");
const { contactsRothed } = require("./routes/contacts/contacts");
const { leadsRouted } = require("./routes/lead/lead");
const { officeRouted } = require("./routes/office/office");
const { plansRouted } = require("./routes/plans/plans");
const { fyRouted } = require("./routes/prodution/financialYear/fy");
const { formulaRouted } = require("./routes/prodution/formula/formula");
const { productRouted } = require("./routes/prodution/product/product");
const {
  productCatRouted,
} = require("./routes/prodution/productCategory/prCategory");
const { sepidarRouted } = require("./routes/prodution/sepidar/sepidar");
const { sourceRouted } = require("./routes/prodution/source/source");
const { rolesRouted } = require("./routes/roles/roles");
const { syncRouted } = require("./routes/sync/sync");
const { tasksRouted } = require("./routes/tasks/tasks");
const { uploadImageRouted } = require("./routes/upload/upload.image");
const { visitorRothed } = require("./routes/visitor/visitor");

const router = require("express").Router();

router.use("/api/v1/auth", authRouted);
router.use("/api/v1/ads", adsRouted);
router.use("/api/v1/leads", leadsRouted);
router.use("/api/v1/roles", rolesRouted);
router.use("/api/v1/visitor", visitorRothed);
router.use("/api/v1/imageUpload", uploadImageRouted);
router.use("/api/v1/contact", contactsRothed);
router.use("/api/v1/task", tasksRouted);
router.use("/api/v1/calender", calenderRouted);
router.use("/api/v1/fy", fyRouted);
router.use("/api/v1/source", sourceRouted);
router.use("/api/v1/category", productCatRouted);
router.use("/api/v1/product", productRouted);
router.use("/api/v1/formula", formulaRouted);
router.use("/api/v1/sepidar", sepidarRouted);
router.use("/api/v1/plans", plansRouted);
router.use("/api/v1/admin", adminRouted);
router.use("/api/v1/office", officeRouted);
router.use("/api/v1/sync", syncRouted);
router.use("/api/v1/chat", chatRouthed);

module.exports = {
  allRouted: router,
};
