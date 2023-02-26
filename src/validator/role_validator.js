const { check } = require("express-validator");

const roleCreateValidator = [
  check("role_name")
    .isLength({ min: 1 })
    .withMessage("action name tidak boleh kosong"),
];

module.exports = roleCreateValidator