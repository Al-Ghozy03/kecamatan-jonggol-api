const { check } = require("express-validator");

const actionCreateValidator = [
  check("action_name")
    .isLength({ min: 1 })
    .withMessage("action name tidak boleh kosong"),
  check("description")
    .isLength({ min: 1 })
    .withMessage("description tidak boleh kosong"),
];

module.exports = actionCreateValidator