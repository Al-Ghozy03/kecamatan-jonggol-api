const umkm_controller = require("../controller/umkm_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const umkmCreateValidator = require("../validator/umkm_validator");
const router = require("express")();

router.use(jwtMiddleware);
router.post(
  "/create",
  umkmCreateValidator,
  validatorMiddleware,
  umkm_controller.create
);

router.put("/edit/:id", umkm_controller.edit);
router.delete("/delete/:id", umkm_controller.delete);
router.get("/", umkm_controller.get);

module.exports = { umkm_router: router };
