const { check } = require("express-validator");

const pendudukRegisterValidator = [
  check("nama").isLength({ min: 1 }).withMessage("nama tidak boleh kosong"),
  check("nik")
    .isLength({ min: 16, max: 16 })
    .withMessage("NIK harus 16 digit")
    .isNumeric()
    .withMessage("NIK harus angka"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password minimal 6 karakter"),
  check("id_desa")
    .isMongoId()
    .withMessage("pastikan id_desa sesuai dengan mongo id")
    .isLength({ min: 1 })
    .withMessage("desa tidak boleh kosong"),
];
const pendudukEditValidator = [
  check("alamat").isLength({ min: 1 }).withMessage("alamat tidak boleh kosong"),
  check("rt").isLength({ min: 1 }).withMessage("RT tidak boleh kosong"),
  check("rw").isLength({ min: 1 }).withMessage("RW tidak boleh kosong"),
  check("dusun").isLength({ min: 1 }).withMessage("dusun tidak boleh kosong"),
  check("nomor_kk").isNumeric().withMessage("nomor KK harus angka")
    .isLength({ min: 1 })
    .withMessage("nomor kk tidak boleh kosong"),
  check("jenis_kelamin")
    .isLength({ min: 1 })
    .withMessage("jenis kelamin tidak boleh kosong"),
  check("tempat_lahir")
    .isLength({ min: 1 })
    .withMessage("tempat lahir tidak boleh kosong"),
  check("tanggal_lahir")
    .isLength({ min: 1 })
    .withMessage("tanggal lahir tidak boleh kosong"),
  check("agama").isLength({ min: 1 }).withMessage("agama tidak boleh kosong"),
  check("pendidikan_dalam_kk")
    .isLength({ min: 1 })
    .withMessage("pendidikan dalam kk tidak boleh kosong"),
  check("pendidikan_sedang_ditempuh")
    .isLength({ min: 1 })
    .withMessage("pendidikan sedang ditempuh tidak boleh kosong"),
  check("pekerjaan")
    .isLength({ min: 1 })
    .withMessage("pekerjaan tidak boleh kosong"),
  check("kawin").isLength({ min: 1 }).withMessage("kawin tidak boleh kosong"),
  check("hubungan_keluarga")
    .isLength({ min: 1 })
    .withMessage("hubungan keluarga tidak boleh kosong"),
  check("kewarganegaraan")
    .isLength({ min: 1 })
    .withMessage("kewarganegaraan tidak boleh kosong"),
  check("nama_ayah")
    .isLength({ min: 1 })
    .withMessage("nama ayah tidak boleh kosong"),
  check("nama_ibu")
    .isLength({ min: 1 })
    .withMessage("nama ibu tidak boleh kosong"),
  check("golongan_darah")
    .isLength({ min: 1 })
    .withMessage("golongan darah tidak boleh kosong"),
  check("akta_lahir")
    .isLength({ min: 1 })
    .withMessage("akta lahir tidak boleh kosong"),
  check("nomor_dokumen_passpor")
    .isLength({ min: 1 })
    .withMessage("nomor dokumen paspor tidak boleh kosong"),
  check("tanggal_akhir_passport")
    .isLength({ min: 1 })
    .withMessage("tanggal akhir paspor tidak boleh kosong"),
  check("nomor_dokumen_KITAS")
    .isLength({ min: 1 })
    .withMessage("nomor dokumen KITAS tidak boleh kosong"),
  check("nik_ayah")
    .isLength({ min: 1 })
    .withMessage("NIK ayah tidak boleh kosong")
    .isNumeric()
    .withMessage("NIK ayah harus angka"),
  check("nik_ibu")
    .isLength({ min: 1 })
    .withMessage("NIK ibu tidak boleh kosong").isNumeric().withMessage("NIK ibu harus angka"),
  check("nomor_akta_perkawinan")
    .isLength({ min: 1 })
    .withMessage("nomor akta perkawinan tidak boleh kosong"),
  check("tanggal_perkawinan")
    .isLength({ min: 1 })
    .withMessage("tanggal perkawinan tidak boleh kosong"),
  check("nomor_akta_cerai")
    .isNumeric()
    .withMessage("nomor akta cerai harus angka")
    .isLength({ min: 1 })
    .withMessage("nomor akta cerai tidak boleh kosong"),
  check("tanggal_cerai")
    .isLength({ min: 1 })
    .withMessage("tanggal cerai tidak boleh kosong"),
  check("cacat").isLength({ min: 1 }).withMessage("cacat tidak boleh kosong"),
  check("cara_kb")
    .isLength({ min: 1 })
    .withMessage("cara kb tidak boleh kosong"),
  check("hamil").isLength({ min: 1 }).withMessage("hamil tidak boleh kosong"),
  check("alamat_sekarang")
    .isLength({ min: 1 })
    .withMessage("alamat sekarang tidak boleh kosong"),
];

module.exports = {
  pendudukEditValidator,
  pendudukRegisterValidator,
};
