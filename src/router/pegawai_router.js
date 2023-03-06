const pegawai_controller = require("../controller/pegawai_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const upload = require("../middleware/upload");
const validatorMiddleware = require("../middleware/validator_middleware");
const pegawaiCreateValidator = require("../validator/pegawai_validator");
const router = require("express")();

router.use(jwtMiddleware);
router.get("/", pegawai_controller.get);
router.get("/:slug", pegawai_controller.detail);
router.post(
  "/create",
  upload.single("pass_foto"),
  pegawaiCreateValidator,
  validatorMiddleware,
  pegawai_controller.create
);
router.delete("/delete/:slug", pegawai_controller.delete);
router.put("/edit/:slug", upload.single("pass_foto"), pegawai_controller.edit);

module.exports = { pegawai_router: router };
