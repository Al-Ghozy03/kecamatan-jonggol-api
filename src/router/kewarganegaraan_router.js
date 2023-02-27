const kewarganegaraan_controller = require("../controller/kewarganegaraan_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const kewarganegaraanCreateValidator = require("../validator/kewarganegaraan_validator");
const router = require("express")();

router.use(jwtMiddleware);
router.post(
  "/create",
  kewarganegaraanCreateValidator,
  validatorMiddleware,
  kewarganegaraan_controller.create
);

router.put("/edit/:id", kewarganegaraan_controller.edit);
router.delete("/delete/:id", kewarganegaraan_controller.delete);
router.get("/", kewarganegaraan_controller.get);

module.exports = { kewarganegaraan_router: router };
