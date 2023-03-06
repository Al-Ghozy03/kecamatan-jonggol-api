const album_controller = require("../controller/album_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const validatorMiddleware = require("../middleware/validator_middleware");
const albumCreateValidator = require("../validator/album_validator");
const router = require("express")();

router.get("/", album_controller.get);
router.use(jwtMiddleware);
router.post(
  "/create",
  albumCreateValidator,
  validatorMiddleware,
  album_controller.create
);

router.put("/edit/:slug", album_controller.edit);
router.delete("/delete/:slug", album_controller.delete);

module.exports = { album_router: router };
