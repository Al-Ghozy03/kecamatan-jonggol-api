const tentang_controller = require("../controller/tentang_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const tentangCreateValidator = require("../validator/tentang_validator");
const router = require("express")();

router.get("/", tentang_controller.get);
router.use(jwtMiddleware);
router.post(
  "/create",
  tentangCreateValidator,
  validatorMiddleware,
  tentang_controller.create
);
router.put("/edit/:id", tentang_controller.edit);

module.exports = { tentang_router: router };
