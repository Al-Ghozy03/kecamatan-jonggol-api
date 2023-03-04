const { check } = require("express-validator");

const galeriCreateValidator = [
  check("id_album").isLength({ min: 1 }).withMessage("id_album wajib diisi"),
  check("nama").isLength({ min: 1 }).withMessage("nama wajib diisi"),
  check("deskripsi").isLength({ min: 1 }).withMessage("deskripsi wajib diisi"),
  check("thumbnail").custom((val, { req }) => {
    if (req.file === undefined)
      return Promise.reject("thumbnail tidak boleh kosong");
    return true;
  }),
];

module.exports = galeriCreateValidator;
