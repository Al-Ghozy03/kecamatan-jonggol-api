const sarana_keagamaan_controller = require("../controller/sarana_keagamaan_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const saranaKeagamaanCreateValidator = require("../validator/saranan_keagamaan_validator");
const router = require("express")();

router.use(jwtMiddleware);
router.post(
  "/create",
  saranaKeagamaanCreateValidator,
  validatorMiddleware,
  sarana_keagamaan_controller.create
);

router.put("/edit/:id", sarana_keagamaan_controller.edit);
router.delete("/delete/:id", sarana_keagamaan_controller.delete);
router.get("/", sarana_keagamaan_controller.get);

module.exports = { sarana_keagamaan_router: router };
