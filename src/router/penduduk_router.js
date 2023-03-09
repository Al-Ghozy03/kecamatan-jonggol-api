const penduduk_controller = require("../controller/penduduk_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const {
  pendudukRegisterValidator,
  pendudukEditValidator,
} = require("../validator/penduduk_validator");

const router = require("express")();

router.post("/login", penduduk_controller.login);
router.post(
  "/register",
  pendudukRegisterValidator,
  validatorMiddleware,
  penduduk_controller.register
);
router.get("/total", penduduk_controller.total);
router.use(jwtMiddleware);
router.put(
  "/edit/:slug",
  pendudukEditValidator,
  validatorMiddleware,
  penduduk_controller.edit
);
router.get("/", penduduk_controller.get);
router.get("/:slug", penduduk_controller.detail);

module.exports = { penduduk_router: router };
