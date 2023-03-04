const { check } = require("express-validator");

const roleActionCreateValidator = [
  check("id_role")
    .isLength({ min: 1 })
    .withMessage("id_role tidak boleh kosong")
    .isNumeric()
    .withMessage("id_role harus angka"),
  check("id_action")
    .isLength({ min: 1 })
    .withMessage("id_action tidak boleh kosong")
    .isNumeric()
    .withMessage("id_role harus angka"),
];

module.exports = roleActionCreateValidator;
