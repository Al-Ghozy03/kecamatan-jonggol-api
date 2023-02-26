const role_action_controller = require("../controller/role_action_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const roleActionCreateValidator = require("../validator/role_action_validator");
const router = require("express")();

router.use(jwtMiddleware);
router.post(
  "/create",
  roleActionCreateValidator,
  validatorMiddleware,
  role_action_controller.create
);

router.put("/edit/:id", role_action_controller.edit);
router.delete("/delete/:id", role_action_controller.delete);
router.get("/", role_action_controller.get);

module.exports = { role_action_router: router };
