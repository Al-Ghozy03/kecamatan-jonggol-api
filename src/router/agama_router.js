const agama_controller = require("../controller/agama_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const agamaCreateValidator = require("../validator/kewarganegaraan_validator");
const router = require("express")();

router.use(jwtMiddleware);
router.post(
  "/create",
  agamaCreateValidator,
  validatorMiddleware,
  agama_controller.create
);

router.put("/edit/:id", agama_controller.edit);
router.delete("/delete/:id", agama_controller.delete);
router.get("/", agama_controller.get);

module.exports = { agama_router: router };
