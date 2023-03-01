const { check } = require("express-validator");

const layananCreateValidator = [
  check("nama").isLength({ min: 1 }).withMessage("nama wajib diisi"),
  check("syarat").isLength({ min: 1 }).withMessage("syarat wajib diisi"),
  check("template").custom((val, { req }) => {
    if (req.file === undefined)
      return Promise.reject("template tidak boleh kosong");
    return true;
  }),
];

module.exports = { layananCreateValidator };
