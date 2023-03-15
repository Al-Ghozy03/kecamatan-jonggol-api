const { check } = require("express-validator");

const kontakCreateValidator = [
  check("nama").isLength({ min: 1 }).withMessage("nama tidak boleh kosong"),
  check("no_hp")
    .isLength({ min: 12 })
    .withMessage("no hp harus 12 angka")
    .isNumeric()
    .withMessage("no hp harus angka"),
];

module.exports = kontakCreateValidator