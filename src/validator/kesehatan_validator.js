const { check } = require("express-validator");

const kesehatanCreateValidator = [
  check("nama").isLength({ min: 1 }).withMessage("nama wajib diisi"),
  check("deskripsi").isLength({ min: 1 }).withMessage("deskripsi wajib diisi"),
  check("maps").isLength({ min: 1 }).withMessage("maps wajib diisi"),
  check("kontak").isLength({ min: 12}).withMessage("kontak wajib 12 angka").isNumeric().withMessage("kontak harus angka"),
  check("id_desa").isLength({ min: 1 }).withMessage("id desa wajib diisi").isNumeric().withMessage("id desa harus angka"),
  check("thumbnail").custom((val, { req }) => {
    if (req.file === undefined)
      return Promise.reject("thumbnail tidak boleh kosong");
    return true;
  }),
];

module.exports = kesehatanCreateValidator;
