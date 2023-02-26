const action_controller = require("../controller/action_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const actionCreateValidator = require("../validator/action_validator");
const router = require("express")();

router.use(jwtMiddleware);
router.post(
  "/create",
  actionCreateValidator,
  validatorMiddleware,
  action_controller.create
);

router.put("/edit/:id", action_controller.edit);
router.delete("/delete/:id", action_controller.delete);
router.get("/", action_controller.get);

module.exports = { action_router: router };
