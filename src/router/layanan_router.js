const layanan_controller = require("../controller/layanan_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const upload = require("../middleware/upload");

const router = require("express")();

router.use(jwtMiddleware);
router.post("/create",upload.single("template") ,layanan_controller.create);

module.exports = { layanan_router: router };
