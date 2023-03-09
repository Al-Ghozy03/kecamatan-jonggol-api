const { check } = require("express-validator");
const adminRegisterValidator = [
  check("email")
    .isEmail()
    .withMessage("masukan email yang valid")
    .isLength({ min: 1 })
    .withMessage("email tidak boleh kosong"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password minimal 6 karakter"),
  check("id_role").isLength({ min: 1 }).withMessage("role tidak boleh kosong"),
];
const adminLoginValidator = [
  check("email")
    .isEmail()
    .withMessage("masukan email yang valid")
    .isLength({ min: 1 })
    .withMessage("email tidak boleh kosong"),
  check("password")
    .isLength({ min: 1 })
    .withMessage("password tidak boleh kosong"),
];

module.exports = { adminRegisterValidator, adminLoginValidator };
