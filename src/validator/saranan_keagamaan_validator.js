const { check } = require("express-validator");

const saranaKeagamaanCreateValidator = [
  check("nama_sarana")
    .isLength({ min: 1 })
    .withMessage("nama sarana tidak boleh kosong"),
  check("pimpinan")
    .isLength({ min: 1 })
    .withMessage("pimpinan tidak boleh kosong"),
  check("alamat").isLength({ min: 1 }).withMessage("alamat tidak boleh kosong"),
  check("id_desa")
    .isLength({ min: 1 })
    .withMessage("id desa tidak boleh kosong")
    .isNumeric()
    .withMessage("id desa harus angka"),
];

module.exports = saranaKeagamaanCreateValidator;
