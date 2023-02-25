const { check } = require("express-validator");

const suratCreateValidator = [
    check("id_layanan").isLength({min:1}).withMessage("layanan wajib diisi")
]
module.exports = suratCreateValidator