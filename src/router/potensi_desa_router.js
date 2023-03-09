const potensi_desa_controller = require("../controller/potensi_desa_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const upload = require("../middleware/upload");
const validatorMiddleware = require("../middleware/validator_middleware");
const potensiCreateValidator = require("../validator/potensi_desa_validator");
const router = require("express")();

router.get("/", potensi_desa_controller.get);
router.get("/:slug", potensi_desa_controller.detail);
router.use(jwtMiddleware);
router.post(
  "/create",
  upload.single("thumbnail"),
  potensiCreateValidator,
  validatorMiddleware,
  potensi_desa_controller.create
);
router.delete("/delete/:slug", potensi_desa_controller.delete);
router.put("/edit/:slug", upload.single("thumbnail"), potensi_desa_controller.edit);

module.exports = { potensi_desa_router: router };
