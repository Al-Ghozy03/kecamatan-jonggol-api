const { penduduk_router } = require("./penduduk_router");
const router = require("express")();

router.use("/penduduk", penduduk_router);
router.all("*",(req,res)=>res.status(404).json({code:404,message:"route not found"}))
module.exports = router;
