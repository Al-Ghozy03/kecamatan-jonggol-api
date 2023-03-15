const kontak_controller = require("../controller/kontak_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const kontakCreateValidator = require("../validator/kontak_validator");
const router = require("express")();

router.get("/", kontak_controller.get);
router.use(jwtMiddleware);
router.post(
  "/create",
  kontakCreateValidator,
  validatorMiddleware,
  kontak_controller.create
);
router.put("/edit/:slug", kontak_controller.edit);
router.delete("/delete/:slug", kontak_controller.edit);

module.exports = { kontak_router: router };
