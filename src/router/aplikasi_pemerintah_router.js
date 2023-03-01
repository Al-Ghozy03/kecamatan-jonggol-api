const aplikasi_pemerintah_controller = require("../controller/aplikasi_pemerintah_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const upload = require("../middleware/upload");
const validatorMiddleware = require("../middleware/validator_middleware");
const aplikasiCreateValidator = require("../validator/aplikasi_pemerintah_validator");
const router = require("express")();

router.get("/", aplikasi_pemerintah_controller.get);
router.get("/:id", aplikasi_pemerintah_controller.detail);
router.use(jwtMiddleware);
router.post(
  "/create",
  upload.single("thumbnail"),
  aplikasiCreateValidator,
  validatorMiddleware,
  aplikasi_pemerintah_controller.create
);
router.delete("/delete/:id", aplikasi_pemerintah_controller.delete);
router.put("/edit/:id", upload.single("thumbnail"), aplikasi_pemerintah_controller.edit);

module.exports = { aplikasi_pemerintah_router: router };
