const { action_router } = require("./action_router");
const { role_router } = require("./role_router");
const { role_action_router } = require("./role_action_router");
const { admin_router } = require("./admin_router");
const { berita_router } = require("./berita_router");
const { layanan_router } = require("./layanan_router");
const { penduduk_router } = require("./penduduk_router");
// const { surat_router } = require("./surat_router");
const { desa_router } = require("./desa_router");
const { auth_router } = require("./auth_router");
const { tentang_router } = require("./tentang_router");
const { album_router } = require("./album_router");
const { galeri_router } = require("./galeri_router");
const { bumd_router } = require("./bumd_router");
const { umkm_router } = require("./umkm_router");
const { sarana_keagamaan_router } = require("./sarana_keagamaan_router");
const { ormas_router } = require("./ormas_router");
const { sekolah_router } = require("./sekolah_router");
const router = require("express")();

router.use("/auth", auth_router);
router.use("/penduduk", penduduk_router);
router.use("/admin", admin_router);
router.use("/layanan", layanan_router);
// router.use("/surat", surat_router);
router.use("/berita", berita_router);
router.use("/action", action_router);
router.use("/role", role_router);
router.use("/role-action", role_action_router);
router.use("/desa", desa_router);
router.use("/tentang", tentang_router);
router.use("/album", album_router);
router.use("/galeri", galeri_router);
router.use("/bumd", bumd_router);
router.use("/umkm", umkm_router);
router.use("/sarana-keagamaan", sarana_keagamaan_router);
router.use("/ormas", ormas_router);
router.use("/sekolah", sekolah_router);
router.all("*", (req, res) =>
  res.status(404).json({ code: 404, message: "route not found" })
);
module.exports = router;
