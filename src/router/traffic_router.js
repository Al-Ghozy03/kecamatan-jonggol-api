const traffic_controller = require("../controller/traffic_controller");

const router = require("express")();

router.post("/create", traffic_controller.create);
router.get("/total-pengunjung", traffic_controller.totalPengunjung);
router.get("/total-pendaftar", traffic_controller.totalPendaftar);

module.exports = { traffic_router: router };
