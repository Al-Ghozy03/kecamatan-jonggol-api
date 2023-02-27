const { check } = require("express-validator");

const desaCreateValidator = [
  check("nama_desa")
    .isLength({ min: 1 })
    .withMessage("nama_desa tidak boleh kosong"),
  check("kepala_desa")
    .isLength({ min: 1 })
    .withMessage("kepala_desa tidak boleh kosong"),
  check("longtitude")
    .isLength({ min: 1 })
    .withMessage("longtitude tidak boleh kosong"),
  check("latitude")
    .isLength({ min: 1 })
    .withMessage("latitude tidak boleh kosong"),
];

module.exports = desaCreateValidator;
