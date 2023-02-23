const penduduk_controller = require("../controller/penduduk_controller");

const router = require("express")();

router.get("/", (req, res) => {
  res.send("ok");
});

router.post("/register", penduduk_controller.register);
module.exports = { penduduk_router: router };
