const bumd_controller = require("../controller/bumd_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const bumdCreateValidator = require("../validator/bumd_validator");
const router = require("express")();

router.use(jwtMiddleware);
router.post(
  "/create",
  bumdCreateValidator,
  validatorMiddleware,
  bumd_controller.create
);

router.put("/edit/:id", bumd_controller.edit);
router.delete("/delete/:id", bumd_controller.delete);
router.get("/", bumd_controller.get);

module.exports = { bumd_router: router };
