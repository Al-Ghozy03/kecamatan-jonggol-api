const desa_controller = require("../controller/desa_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const desaCreateValidator = require("../validator/desa_validator");
const router = require("express")();

router.get("/total", desa_controller.total);
router.get("/", desa_controller.get);
router.use(jwtMiddleware);
router.post(
  "/create",
  desaCreateValidator,
  validatorMiddleware,
  desa_controller.create
);

router.put("/edit/:slug", desa_controller.edit);
router.delete("/delete/:slug", desa_controller.delete);

module.exports = { desa_router: router };
