const berita_controller = require("../controller/berita_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const upload = require("../middleware/upload");
const validatorMiddleware = require("../middleware/validator_middleware");
const beritaCreateValidator = require("../validator/berita_validator");
const router = require("express")();

router.use(jwtMiddleware);
router.post(
  "/create",
  upload.single("thumbnail"),
  beritaCreateValidator,
  validatorMiddleware,
  berita_controller.create
);
router.delete("/delete/:id", berita_controller.delete);
router.put("/edit/:id", upload.single("thumbnail"), berita_controller.edit);
router.get("/", berita_controller.get);
router.get("/:id", berita_controller.detail);

module.exports = { berita_router: router };
