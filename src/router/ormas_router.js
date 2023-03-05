const ormas_controller = require("../controller/ormas_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const ormasCreateValidator = require("../validator/ormas_validator");
const router = require("express")();

router.use(jwtMiddleware);
router.post(
  "/create",
  ormasCreateValidator,
  validatorMiddleware,
  ormas_controller.create
);

router.put("/edit/:id", ormas_controller.edit);
router.delete("/delete/:id", ormas_controller.delete);
router.get("/", ormas_controller.get);

module.exports = { ormas_router: router };
