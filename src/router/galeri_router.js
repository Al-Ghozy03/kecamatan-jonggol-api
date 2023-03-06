const galeri_controller = require("../controller/galeri_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const upload = require("../middleware/upload");
const validatorMiddleware = require("../middleware/validator_middleware");
const galeriCreateValidator = require("../validator/galeri_validator");
const router = require("express")();

router.get("/", galeri_controller.get);
router.get("/:slug", galeri_controller.detail);
router.use(jwtMiddleware);
router.post(
  "/create",
  upload.single("thumbnail"),
  galeriCreateValidator,
  validatorMiddleware,
  galeri_controller.create
);
router.delete("/delete/:slug", galeri_controller.delete);
router.put("/edit/:slug", upload.single("thumbnail"), galeri_controller.edit);

module.exports = { galeri_router: router };
