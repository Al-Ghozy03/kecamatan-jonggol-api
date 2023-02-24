const { admin_router } = require("./admin_router");
const { layanan_router } = require("./layanan_router");
const { penduduk_router } = require("./penduduk_router");
const router = require("express")();

router.use("/penduduk", penduduk_router);
router.use("/admin", admin_router);
router.use("/layanan", layanan_router);
router.all("*", (req, res) =>
  res.status(404).json({ code: 404, message: "route not found" })
);
module.exports = router;
