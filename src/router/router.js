const { action_router } = require("./action_router");
const { role_router } = require("./role_router");
const { role_action_router } = require("./role_action_router");
const { admin_router } = require("./admin_router");
const { berita_router } = require("./berita_router");
const { layanan_router } = require("./layanan_router");
const { penduduk_router } = require("./penduduk_router");
const { surat_router } = require("./surat_router");
const router = require("express")();

router.use("/penduduk", penduduk_router);
router.use("/admin", admin_router);
router.use("/layanan", layanan_router);
router.use("/surat", surat_router);
router.use("/berita", berita_router);
router.use("/action", action_router);
router.use("/role", role_router);
router.use("/role-action", role_action_router);
router.all("*", (req, res) =>
  res.status(404).json({ code: 404, message: "route not found" })
);
module.exports = router;
