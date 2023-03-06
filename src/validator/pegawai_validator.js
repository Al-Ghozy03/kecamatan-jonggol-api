const { check } = require("express-validator");

const pegawaiCreateValidator = [
  check("nama").isLength({ min: 1 }).withMessage("nama wajib diisi"),
  check("tempat_lahir")
    .isLength({ min: 1 })
    .withMessage("tempat lahir wajib diisi"),
  check("tanggal_lahir")
    .isLength({ min: 1 })
    .withMessage("tanggal lahir wajib diisi"),
  check("status").isLength({ min: 1 }).withMessage("status wajib diisi"),
  check("no_ktp")
  .isLength({ min: 16 })
  .withMessage("no ktp harus 16 digit")
  .isNumeric()
  .withMessage("no ktp harus angka"),
  check("no_hp")
  .isLength({ min: 12 })
  .withMessage("no hp harus 12 digit")
  .isNumeric()
  .withMessage("no hp harus angka"),
  check("jenis_kelamin").isLength({ min: 1 }).withMessage("jenis kelamin wajib diisi"),
  check("agama").isLength({ min: 1 }).withMessage("agama wajib diisi"),
  check("status_kawin").isLength({ min: 1 }).withMessage("status kawin wajib diisi"),
  check("jabatan").isLength({ min: 1 }).withMessage("jabatan wajib diisi"),
  check("pangkat").isLength({ min: 1 }).withMessage("pangkat wajib diisi"),
  check("pendidikan").isLength({ min: 1 }).withMessage("pendidikan wajib diisi"),
  check("alamat").isLength({ min: 1 }).withMessage("alamat wajib diisi"),
  check("email").isLength({ min: 1 }).withMessage("email wajib diisi").isEmail().withMessage("masukan email yang valid"),
  check("pass_foto").custom((val, { req }) => {
    if (req.file === undefined)
      return Promise.reject("pass foto tidak boleh kosong");
    return true;
  }),
];

module.exports = pegawaiCreateValidator;
