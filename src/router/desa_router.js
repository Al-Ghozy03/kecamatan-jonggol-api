const desa_controller = require("../controller/desa_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const desaCreateValidator = require("../validator/desa_validator");
const router = require("express")();

router.use(jwtMiddleware);
router.post(
  "/create",
  desaCreateValidator,
  validatorMiddleware,
  desa_controller.create
);

router.put("/edit/:id", desa_controller.edit);
router.delete("/delete/:id", desa_controller.delete);
router.get("/", desa_controller.get);

module.exports = { desa_router: router };
