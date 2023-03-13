const kesehatan_controller = require("../controller/kesehatan_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const upload = require("../middleware/upload");
const validatorMiddleware = require("../middleware/validator_middleware");
const kesehatanCreateValidator = require("../validator/kesehatan_validator");
const router = require("express")();

router.get("/total", kesehatan_controller.total);
router.get("/", kesehatan_controller.get);
router.get("/:slug", kesehatan_controller.detail);
router.use(jwtMiddleware);
router.post(
  "/create",
  upload.single("thumbnail"),
  kesehatanCreateValidator,
  validatorMiddleware,
  kesehatan_controller.create
);
router.delete("/delete/:slug", kesehatan_controller.delete);
router.put("/edit/:slug", upload.single("thumbnail"), kesehatan_controller.edit);

module.exports = { kesehatan_router: router };
