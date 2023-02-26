const { check } = require("express-validator");

const beritaCreateValidator = [
  check("judul").isLength({ min: 1 }).withMessage("judul wajib diisi"),
  check("konten").isLength({ min: 1 }).withMessage("konten wajib diisi"),
  check("thumbnail").custom((val, { req }) => {
    if (req.file === undefined)
      return Promise.reject("thumbnail tidak boleh kosong");
    return true;
  }),
];

module.exports = beritaCreateValidator;
