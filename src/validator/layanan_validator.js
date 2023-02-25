const { check } = require("express-validator");

const layananCreateValidator = [
  check("nama").isLength({ min: 1 }).withMessage("nama wajib diisi"),
  check("syarat").isLength({ min: 1 }).withMessage("syarat wajib diisi"),
  check("template").custom((val, { req }) => {
    if (req.file === undefined)
      return Promise.reject("template tidak boleh kosong");
    if (
      req.file.mimetype !==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
      return Promise.reject("file harus berekstensi .docx");
    return true;
  }),
];
const layananEditValidator = [
  check("template").custom((val, { req }) => {
    if (req.file !== undefined) {
      if (
        req.file.mimetype !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      )
        return Promise.reject("file harus berekstensi .docx");
    }
    return true;
  }),
];

module.exports = { layananCreateValidator, layananEditValidator };
