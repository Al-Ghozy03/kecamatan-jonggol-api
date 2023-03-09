const { check } = require("express-validator");

const potensiDesaCreateValidator = [
  check("nama_potensi").isLength({ min: 1 }).withMessage("nama potensi wajib diisi"),
  check("kategori").isLength({ min: 1 }).withMessage("kategori wajib diisi"),
  check("deskripsi").isLength({ min: 1 }).withMessage("deskripsi wajib diisi"),
  check("id_desa").isLength({ min: 1 }).withMessage("id desa wajib diisi").isNumeric().withMessage("id desa wajib diisin"),
  check("thumbnail").custom((val, { req }) => {
    if (req.file === undefined)
      return Promise.reject("thumbnail tidak boleh kosong");
    return true;
  }),
];

module.exports = potensiDesaCreateValidator;
