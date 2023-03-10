const agenda_controller = require("../controller/agenda_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const upload = require("../middleware/upload");
const validatorMiddleware = require("../middleware/validator_middleware");
const agendaCreateValidator = require("../validator/agenda_validator");
const router = require("express")();

router.get("/", agenda_controller.get);
router.get("/:slug", agenda_controller.detail);
router.use(jwtMiddleware);
router.post(
  "/create",
  upload.single("thumbnail"),
  agendaCreateValidator,
  validatorMiddleware,
  agenda_controller.create
);
router.delete("/delete/:slug", agenda_controller.delete);
router.put("/edit/:slug", upload.single("thumbnail"), agenda_controller.edit);

module.exports = { agenda_router: router };
