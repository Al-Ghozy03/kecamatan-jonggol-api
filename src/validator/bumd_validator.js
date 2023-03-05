const { check } = require("express-validator");

const bumdCreateValidator = [
  check("id_desa")
    .isLength({ min: 1 })
    .withMessage("id desa name tidak boleh kosong")
    .isNumeric()
    .withMessage("id desa harus angka"),
];

module.exports = bumdCreateValidator;
