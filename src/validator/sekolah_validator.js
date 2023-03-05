const { check } = require("express-validator");

const sekolahCreateValidator = [
  check("nama_sekolah")
    .isLength({ min: 1 })
    .withMessage("nama sekolah tidak boleh kosong"),
  check("npsn")
    .isLength({ min: 8 })
    .withMessage("npsn harus 8 digit")
    .isNumeric()
    .withMessage("npsn harus angka"),
  check("bentuk_pendidikan")
    .isLength({ min: 1 })
    .withMessage("bentuk pendidikan tidak boleh kosong"),
  check("status").isLength({ min: 1 }).withMessage("status tidak boleh kosong"),
  check("alamat").isLength({ min: 1 }).withMessage("alamat tidak boleh kosong"),
  check("id_desa")
    .isLength({ min: 1 })
    .withMessage("id desa tidak boleh kosong")
    .isNumeric()
    .withMessage("id desa harus angka"),
];

module.exports = sekolahCreateValidator;
