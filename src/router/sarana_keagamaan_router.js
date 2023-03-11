const sarana_keagamaan_controller = require("../controller/sarana_keagamaan_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const saranaKeagamaanCreateValidator = require("../validator/saranan_keagamaan_validator");
const router = require("express")();

router.get("/", sarana_keagamaan_controller.get);
router.use(jwtMiddleware);
router.post(
  "/create",
  saranaKeagamaanCreateValidator,
  validatorMiddleware,
  sarana_keagamaan_controller.create
);

router.put("/edit/:slug", sarana_keagamaan_controller.edit);
router.delete("/delete/:slug", sarana_keagamaan_controller.delete);

module.exports = { sarana_keagamaan_router: router };
