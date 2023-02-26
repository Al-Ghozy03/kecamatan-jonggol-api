const role_controller = require("../controller/role_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const roleCreateValidator = require("../validator/role_validator");
const router = require("express")();

router.use(jwtMiddleware);
router.post(
  "/create",
  roleCreateValidator,
  validatorMiddleware,
  role_controller.create
);

router.put("/edit/:id", role_controller.edit);
router.delete("/delete/:id", role_controller.delete);
router.get("/", role_controller.get);

module.exports = { role_router: router };
