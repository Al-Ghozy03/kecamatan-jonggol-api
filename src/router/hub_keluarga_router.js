const hub_keluarga_controller = require("../controller/hub_keluarga_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const hubCreateValidator = require("../validator/kewarganegaraan_validator");
const router = require("express")();

router.use(jwtMiddleware);
router.post(
  "/create",
  hubCreateValidator,
  validatorMiddleware,
  hub_keluarga_controller.create
);

router.put("/edit/:id", hub_keluarga_controller.edit);
router.delete("/delete/:id", hub_keluarga_controller.delete);
router.get("/", hub_keluarga_controller.get);

module.exports = { hub_keluarga_router: router };
