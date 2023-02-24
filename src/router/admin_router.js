const admin_controller = require("../controller/admin_controller");
const router = require("express")();

router.post("/register", admin_controller.register);
router.post("/login", admin_controller.login);

module.exports = {admin_router:router}
