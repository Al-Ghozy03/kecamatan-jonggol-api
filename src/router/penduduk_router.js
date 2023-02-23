const penduduk_controller = require("../controller/penduduk_controller");
const { jwtMiddleware } = require("../middleware/jwt");

const router = require("express")();

router.post("/register", penduduk_controller.register);
router.post("/login", penduduk_controller.login);
router.use(jwtMiddleware);
router.put("/edit/:id", penduduk_controller.edit);

module.exports = { penduduk_router: router };
