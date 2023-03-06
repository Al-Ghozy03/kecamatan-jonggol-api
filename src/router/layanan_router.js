const layanan_controller = require("../controller/layanan_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const upload = require("../middleware/upload");
const validatorMiddleware = require("../middleware/validator_middleware");
const {
  layananCreateValidator,
} = require("../validator/layanan_validator");

const router = require("express")();

router.use(jwtMiddleware);
router.post(
  "/create",
  upload.single("template"),
  layananCreateValidator,
  validatorMiddleware,
  layanan_controller.create
);
router.put(
  "/edit/:slug",
  upload.single("template"),
  layanan_controller.edit
);
router.delete("/delete/:slug", layanan_controller.delete);
router.get("/", layanan_controller.get);
router.get("/:slug", layanan_controller.detail);

module.exports = { layanan_router: router };
