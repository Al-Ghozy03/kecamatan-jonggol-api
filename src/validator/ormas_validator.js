const { check } = require("express-validator");

const ormasCreateValidator = [
  check("nama_ormas")
    .isLength({ min: 1 })
    .withMessage("nama ormas tidak boleh kosong"),
  check("kepanjangan")
    .isLength({ min: 1 })
    .withMessage("kepanjangan tidak boleh kosong"),
];

module.exports = ormasCreateValidator;
