const admin_controller = require("../controller/admin_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const {
  adminRegisterValidator,
  adminLoginValidator,
} = require("../validator/admin_validator");
const router = require("express")();

router.post(
  "/login",
  adminLoginValidator,
  validatorMiddleware,
  admin_controller.login
);
router.use(jwtMiddleware);
router.post(
  "/register",
  adminRegisterValidator,
  validatorMiddleware,
  admin_controller.register
);
router.get("/", admin_controller.get);

module.exports = { admin_router: router };
