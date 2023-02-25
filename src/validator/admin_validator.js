const { check } = require("express-validator");
const admin = require("../database/admin");
const bcrypt = require("bcrypt");
const adminRegisterValidator = [
  check("email")
    .isEmail()
    .withMessage("masukan email yang valid")
    .isLength({ min: 1 })
    .withMessage("email tidak boleh kosong")
    .custom((val) =>
      admin.findOne({ email: val }).then((res) => {
        if (res) return Promise.reject("email telah digunakan");
      })
    ),
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
    .withMessage("email tidak boleh kosong")
    .custom((val) =>
      admin.findOne({ email: val }).then((res) => {
        if (!res) return Promise.reject("email tidak ditemukan");
      })
    ),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password minimal 6 karakter")
    .custom((val, { req }) =>
      admin.findOne({ email: req.body.email }).then((res) => {
        const verify = bcrypt.compareSync(req.body.password, res.password);
        if (!verify) return Promise.reject("password salah");
      })
    ),
];

module.exports = { adminRegisterValidator, adminLoginValidator };
