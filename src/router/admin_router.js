const admin_controller = require("../controller/admin_controller");
const { jwtMiddleware } = require("../middleware/jwt");
const router = require("express")();

router.post("/register", admin_controller.register);
router.post("/login", admin_controller.login);
router.use(jwtMiddleware)
router.get("/", admin_controller.get);

module.exports = {admin_router:router}
