const { check } = require("express-validator");

const roleActionCreateValidator = [
  check("id_role")
    .isLength({ min: 1 })
    .withMessage("id_role tidak boleh kosong")
    .isMongoId()
    .withMessage("id_role tidak valid"),
  check("id_action")
    .isLength({ min: 1 })
    .withMessage("id_action tidak boleh kosong")
    .isMongoId()
    .withMessage("id_action tidak valid"),
];

module.exports = roleActionCreateValidator;
