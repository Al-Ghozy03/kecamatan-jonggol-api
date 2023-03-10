const surat_controller = require("../controller/surat_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const suratCreateValidator = require("../validator/surat_validator");
const router = require("express")();

router.get("/total",surat_controller.total)
router.use(jwtMiddleware);
router.post(
  "/create",
  suratCreateValidator,
  validatorMiddleware,
  surat_controller.create
);
router.get("/", surat_controller.get);
router.put("/edit/:id", surat_controller.edit);
router.delete("/delete/:id", surat_controller.delete);
module.exports = { surat_router: router };
