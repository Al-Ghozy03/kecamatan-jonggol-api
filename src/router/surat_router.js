const surat_controller = require("../controller/surat_controller");

const router = require("express")();

router.post("/create", surat_controller.create);
router.get("/", surat_controller.get);
router.get("/:id", surat_controller.detail);
router.put("/edit/:id", surat_controller.edit);
router.delete("/delete/:id", surat_controller.delete);

module.exports = { surat_router: router };
