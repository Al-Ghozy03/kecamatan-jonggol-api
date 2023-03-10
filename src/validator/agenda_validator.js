const { check } = require("express-validator");

const agendaCreateValidator = [
  check("nama_agenda")
    .isLength({ min: 1 })
    .withMessage("nama agenda wajib diisi"),
  check("start").isLength({ min: 1 }).withMessage("start wajib diisi"),
  check("end").isLength({ min: 1 }).withMessage("end wajib diisi"),
  check("tanggal").isLength({ min: 1 }).withMessage("tanggal wajib diisi"),
  check("tempat").isLength({ min: 1 }).withMessage("tempat wajib diisi"),
  check("deskripsi").isLength({ min: 1 }).withMessage("deskripsi wajib diisi"),
  check("id_desa")
    .isLength({ min: 1 })
    .withMessage("id desa wajib diisi")
    .isNumeric()
    .withMessage("id desa harus angka"),
  check("thumbnail").custom((val, { req }) => {
    if (req.file === undefined)
      return Promise.reject("thumbnail tidak boleh kosong");
    return true;
  }),
];

module.exports = agendaCreateValidator;
