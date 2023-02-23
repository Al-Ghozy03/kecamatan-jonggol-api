const { penduduk_router } = require("./penduduk_router");

const router = require("express")();

router.use("/penduduk", penduduk_router);
module.exports = router;
