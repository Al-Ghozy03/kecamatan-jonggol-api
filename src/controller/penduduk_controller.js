const penduduk = require("../database/penduduk");
const Client = require("./client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const desa = require("../database/desa");
require("dotenv").config();

class Penduduk extends Client {
  async register(req, res) {
    try {
      const body = req.body;
      const check = await penduduk.findOne({ nik: body.nik });
      if (check) return super.response(res, 404, "nik sudah terdaftar");
      const checkDesa = await desa.findById(body.id_desa);
      if (!checkDesa) return super.response(res, 400, "desa tidak ditemukan");
      body.password = await bcrypt.hashSync(body.password, 12);
      const data = await penduduk.create(body);
      const token = jwt.sign(
        { id: data._id, role: "penduduk" },
        process.env.JWT_SIGN,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("token", token, { httpOnly: true });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async login(req, res) {
    try {
      const { nik, password } = req.body;
      const check = await penduduk.findOne({ nik });
      if (!check) super.response(res, 404, "nik tidak ditemukan");
      const verify = await bcrypt.compareSync(password, check.password);
      if (!verify) return super.response(res, 401, "password salah");
      const token = jwt.sign(
        { id: check._id, role: "penduduk" },
        process.env.JWT_SIGN,
        { expiresIn: "1d" }
      );
      res.cookie("token", token, { httpOnly: true });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async edit(req, res) {
    try {
      const { id } = req.params;
      const check = await penduduk.findById(id);
      if (!check) return super.response(res, 404, "penduduk tidak ditemukan");
      await penduduk.updateOne({ _id: check._id }, { $set: { ...req.body } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 200, er);
    }
  }
  async get(req, res) {
    try {
      const { key, page, limit } = req.query;
      const size = (parseInt(page) - 1) * parseInt(limit);
      const data = await penduduk
        .find(
          {
            ...(key !== undefined && {
              nama: { $regex: key, $options: "i" },
            }),
          },
          {
            nama: "$nama",
            rt: "$rt",
            rw: "$rw",
            dusun: "$dusun",
            nomor_kk: "$nomor_kk",
            nik: "$nik",
            jenis_kelamin: "$jenis_kelamin",
            tempat_lahir: "$tempat_lahir",
            tanggal_lahir: "$tanggal_lahir",
            agama: "$agama",
            pendidikan_dalam_kk: "$pendidikan_dalam_kk",
            pendidikan_sedang_ditempuh: "$pendidikan_sedang_ditempuh",
            pekerjaan: "$pekerjaan",
            kawin: "$kawin",
            hubungan_keluarga: "$hubungan_keluarga",
            kewarganegaraan: "$kewarganegaraan",
            nama_ayah: "$nama_ayah",
            nama_ibu: "$nama_ibu",
            golongan_darah: "$golongan_darah",
            akta_lahir: "$akta_lahir",
            nomor_dokumen_paspor: "$nomor_dokumen_paspor",
            tanggal_akhir_passport: "$tanggal_akhir_passport",
            nomor_dokumen_KITAS: "$nomor_dokumen_KITAS",
            nik_ayah: "$nik_ayah",
            nik_ibu: "$nik_ibu",
            nomor_akta_perkawinan: "$nomor_akta_perkawinan",
            tanggal_perkawinan: "$tanggal_perkawinan",
            nomor_akta_cerai: "$nomor_akta_cerai",
            tanggal_perceraian: "$tanggal_perceraian",
            cacat: "$cacat",
            cara_kb: "$cara_kb",
            hamil: "$hamil",
            alamat_sekarang: "$alamat_sekarang",
            id_desa: "$id_desa",
          }
        )
        .skip(size)
        .limit(parseInt(limit));
      const count = await penduduk.countDocuments({
        ...(key !== undefined && {
          nama: { $regex: key, $options: "i" },
        }),
      });
      return super.responseWithPagination(
        res,
        200,
        null,
        data,
        count,
        Math.ceil(count / parseInt(limit)),
        parseInt(parseInt(page))
      );
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }

  async detail(req, res) {
    try {
      const { id } = req.params;
      const data = await penduduk.findById(id, {
        nama: "$nama",
        rt: "$rt",
        rw: "$rw",
        dusun: "$dusun",
        nomor_kk: "$nomor_kk",
        nik: "$nik",
        jenis_kelamin: "$jenis_kelamin",
        tempat_lahir: "$tempat_lahir",
        tanggal_lahir: "$tanggal_lahir",
        agama: "$agama",
        pendidikan_dalam_kk: "$pendidikan_dalam_kk",
        pendidikan_sedang_ditempuh: "$pendidikan_sedang_ditempuh",
        pekerjaan: "$pekerjaan",
        kawin: "$kawin",
        hubungan_keluarga: "$hubungan_keluarga",
        kewarganegaraan: "$kewarganegaraan",
        nama_ayah: "$nama_ayah",
        nama_ibu: "$nama_ibu",
        golongan_darah: "$golongan_darah",
        akta_lahir: "$akta_lahir",
        nomor_dokumen_paspor: "$nomor_dokumen_paspor",
        tanggal_akhir_passport: "$tanggal_akhir_passport",
        nomor_dokumen_KITAS: "$nomor_dokumen_KITAS",
        nik_ayah: "$nik_ayah",
        nik_ibu: "$nik_ibu",
        nomor_akta_perkawinan: "$nomor_akta_perkawinan",
        tanggal_perkawinan: "$tanggal_perkawinan",
        nomor_akta_cerai: "$nomor_akta_cerai",
        tanggal_perceraian: "$tanggal_perceraian",
        cacat: "$cacat",
        cara_kb: "$cara_kb",
        hamil: "$hamil",
        alamat_sekarang: "$alamat_sekarang",
        alamat_sekarang: "$alamat_sekarang",
      });
      if (!data) return super.response(res, 404, "penduduk tidak ditemukan");
      return super.response(res, 200, null, data);
    } catch (er) {
      return super.response(res, 500, er);
    }
  }
}

module.exports = new Penduduk();
