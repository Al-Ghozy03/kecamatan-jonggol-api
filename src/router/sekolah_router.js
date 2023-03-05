const ormas_controller = require("../controller/sekolah_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const sekolahCreateValidator = require("../validator/sekolah_validator");
const router = require("express")();

router.use(jwtMiddleware);
router.post(
  "/create",
  sekolahCreateValidator,
  validatorMiddleware,
  ormas_controller.create
);

router.put("/edit/:id", ormas_controller.edit);
router.delete("/delete/:id", ormas_controller.delete);
router.get("/", ormas_controller.get);

module.exports = { sekolah_router: router };
