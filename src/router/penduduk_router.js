const penduduk_controller = require("../controller/penduduk_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const {
  pendudukRegisterValidator,
  pendudukValidator,
} = require("../validator/penduduk_validator");

const router = require("express")();

router.post(
  "/register",
  pendudukRegisterValidator,
  validatorMiddleware,
  penduduk_controller.register
);
router.post("/login", penduduk_controller.login);
router.use(jwtMiddleware);
router.put(
  "/edit/:id",
  pendudukValidator,
  validatorMiddleware,
  penduduk_controller.edit
);
router.get("/", penduduk_controller.get);
router.get("/:id", penduduk_controller.detail);

module.exports = { penduduk_router: router };
