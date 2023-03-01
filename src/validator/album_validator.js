const { check } = require("express-validator");

const namaCreateValidator = [
  check("nama_album")
    .isLength({ min: 1 })
    .withMessage("nama album tidak boleh kosong"),
];

module.exports = namaCreateValidator