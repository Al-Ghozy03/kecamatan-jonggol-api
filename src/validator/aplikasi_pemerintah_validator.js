const { check } = require("express-validator");

const aplikasiCreateValidator = [
  check("nama").isLength({ min: 1 }).withMessage("nama wajib diisi"),
  check("deskripsi").isLength({ min: 1 }).withMessage("deskripsi wajib diisi"),
  check("thumbnail").custom((val, { req }) => {
    if (req.file === undefined)
      return Promise.reject("thumbnail tidak boleh kosong");
    return true;
  }),
];

module.exports =aplikasiCreateValidator;
