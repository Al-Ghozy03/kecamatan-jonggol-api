const { check } = require("express-validator");

const umkmCreateValidator = [
  check("no_ktp")
    .isLength({ min: 16 })
    .withMessage("no ktp harus 16 digit")
    .isNumeric()
    .withMessage("no ktp harus angka"),
  check("nama_jalan")
    .isLength({ min: 1 })
    .withMessage("nama jalan tidak boleh kosong"),
  check("blok").isLength({ min: 1 }).withMessage("blok tidak boleh kosong"),
  check("no")
    .isLength({ min: 1 })
    .withMessage("no tidak boleh kosong")
    .isNumeric()
    .withMessage("no harus angka"),
  check("rt")
    .isLength({ min: 1 })
    .withMessage("rt tidak boleh kosong")
    .isNumeric()
    .withMessage("rt harus angka"),
    check("rw")
    .isLength({ min: 1 })
    .withMessage("rw tidak boleh kosong")
    .isNumeric()
    .withMessage("rw harus angka"),
    check("jenis_produk")
    .isLength({ min: 1 })
    .withMessage("jenis produk tidak boleh kosong"),
    check("id_penduduk")
      .isLength({ min: 1 })
      .withMessage("id_penduduk tidak boleh kosong")
      .isNumeric()
      .withMessage("id_penduduk harus angka"),
    check("id_desa")
      .isLength({ min: 1 })
      .withMessage("id_desa tidak boleh kosong")
      .isNumeric()
      .withMessage("id_desa harus angka"),

];

module.exports = umkmCreateValidator;
