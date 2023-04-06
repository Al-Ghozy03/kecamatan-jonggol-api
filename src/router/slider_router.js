const slider_controller = require("../controller/slider_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const upload = require("../middleware/upload");
const validatorMiddleware = require("../middleware/validator_middleware");
const sliderCreateValidator = require("../validator/slider_validator");
const router = require("express")();

router.get("/", slider_controller.get);
router.get("/:slug", slider_controller.detail);
router.use(jwtMiddleware);
router.post(
  "/create",
  upload.single("thumbnail"),
  sliderCreateValidator,
  validatorMiddleware,
  slider_controller.create
);
router.delete("/delete/:slug", slider_controller.delete);
router.put("/edit/:slug", upload.single("thumbnail"), slider_controller.edit);

module.exports = { slider_router: router };
