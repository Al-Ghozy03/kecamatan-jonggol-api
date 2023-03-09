const sekolah_controller = require("../controller/sekolah_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const sekolahCreateValidator = require("../validator/sekolah_validator");
const router = require("express")();

router.get("/total",sekolah_controller.total)
router.use(jwtMiddleware);
router.post(
  "/create",
  sekolahCreateValidator,
  validatorMiddleware,
  sekolah_controller.create
);

router.put("/edit/:slug", sekolah_controller.edit);
router.delete("/delete/:slug", sekolah_controller.delete);
router.get("/", sekolah_controller.get);

module.exports = { sekolah_router: router };
