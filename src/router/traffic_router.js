const traffic_controller = require("../controller/traffic_controller");

const router = require("express")();

router.post("/create", traffic_controller.create);
router.get("/", traffic_controller.total);

module.exports = { traffic_router: router };
