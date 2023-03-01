const { check } = require("express-validator");

const tentangCreateValidator = [
  check("deskripsi")
    .isLength({ min: 1 })
    .withMessage("deskripsi tidak boleh kosong"),
];

module.exports = tentangCreateValidator