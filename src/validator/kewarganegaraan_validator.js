const { check } = require("express-validator");

const kewarganegaraanCreateValidator = [
  check("nama").isLength({ min: 1 }).withMessage("nama tidak boleh kosong"),
];

module.exports = kewarganegaraanCreateValidator;
