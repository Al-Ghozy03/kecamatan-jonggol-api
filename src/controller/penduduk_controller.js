const penduduk = require("../../models").penduduk;
const desa = require("../../models").desa;
const Client = require("./client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: jwtDecode } = require("jwt-decode");
const { Op } = require("sequelize");
require("dotenv").config();

class Penduduk extends Client {
  async register(req, res) {
    try {
      const body = req.body;
      const check = await penduduk.findOne({ where: { nik: body.nik } });
      if (check) return super.response(res, 404, "nik sudah terdaftar");
      const checkDesa = await desa.findByPk(body.id_desa);
      if (!checkDesa) return super.response(res, 400, "desa tidak ditemukan");
      body.password = await bcrypt.hashSync(body.password, 12);
      const data = await penduduk.create(body);
      const token = jwt.sign(
        { id: data.id, role: "penduduk" },
        process.env.JWT_SIGN,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
      return super.responseWithToken(res, 200, null, null, token);
    } catch (er) {
      console.log(er);
      return super.responseWithToken(res, 500, er);
    }
  }
  async login(req, res) {
    try {
      const { nik, password } = req.body;
      const check = await penduduk.findOne({ where: { nik } });
      if (!check) super.response(res, 404, "nik tidak ditemukan");
      const verify = await bcrypt.compareSync(password, check.password);
      if (!verify) return super.response(res, 401, "password salah");
      const token = jwt.sign(
        { id: check.id, role: "penduduk" },
        process.env.JWT_SIGN,
        { expiresIn: "1d" }
      );
      res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
      return super.responseWithToken(res, 200, null, null, token);
    } catch (er) {
      console.log(er);
      return super.responseWithToken(res, 500, er);
    }
  }
  async edit(req, res) {
    try {
      const { id } = req.params;
      const check = await penduduk.findByPk(id);
      if (!check) return super.response(res, 404, "penduduk tidak ditemukan");
      await penduduk.update(req.body, { where: { id } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 200, er);
    }
  }
  async get(req, res) {
    try {
      const checkAdmin = jwtDecode(req.headers.authorization);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { key, page, limit } = req.query;
      const size = (parseInt(page) - 1) * parseInt(limit);
      const { count, rows } = await penduduk.findAndCountAll({
        attributes: [
          "id",
          "nama",
          "alamat",
          "rt",
          "rw",
          "nomor_kk",
          "nik",
          "jenis_kelamin",
          "tempat_lahir",
          "tanggal_lahir",
          "agama",
          "pendidikan_dalam_kk",
          "pendidikan_sedang_ditempuh",
          "pekerjaan",
          "kawin",
          "hubungan_keluarga",
          "kewarganegaraan",
          "nama_ayah",
          "nik_ayah",
          "nama_ibu",
          "nik_ibu",
          "golongan_darah",
          "akta_lahir",
          "nomor_dokumen_paspor",
          "tanggal_akhir_passport",
          "nomor_dokumen_KITAS",
          "nomor_akta_perkawinan",
          "tanggal_perkawinan",
          "nomor_akta_cerai",
          "tanggal_perceraian",
          "cacat",
          "cara_kb",
          "hamil",
          "alamat_sekarang",
        ],
        ...(page !== undefined &&
          limit !== undefined && {
            offset: size,
            limit: parseInt(limit),
          }),
        ...(key !== undefined && {
          where: {
            [Op.or]: [
              { nama: { [Op.substring]: key } },
              { nik: { [Op.substring]: key } },
            ],
          },
        }),
        include: {
          model: desa,
          as: "desa",
          attributes: ["nama_desa", "kepala_desa"],
        },
      });
      return super.responseWithPagination(
        res,
        200,
        null,
        rows,
        count,
        Math.ceil(count / parseInt(limit)),
        parseInt(parseInt(page))
      );
    } catch (er) {
      console.log(er);
      return super.responseWithPagination(res, 500, er);
    }
  }
  async detail(req, res) {
    try {
      const { id } = req.params;
      const data = await penduduk.findByPk(id, {
        attributes: [
          "id",
          "nama",
          "alamat",
          "rt",
          "rw",
          "nomor_kk",
          "nik",
          "jenis_kelamin",
          "tempat_lahir",
          "tanggal_lahir",
          "agama",
          "pendidikan_dalam_kk",
          "pendidikan_sedang_ditempuh",
          "pekerjaan",
          "kawin",
          "hubungan_keluarga",
          "kewarganegaraan",
          "nama_ayah",
          "nik_ayah",
          "nama_ibu",
          "nik_ibu",
          "golongan_darah",
          "akta_lahir",
          "nomor_dokumen_paspor",
          "tanggal_akhir_passport",
          "nomor_dokumen_KITAS",
          "nomor_akta_perkawinan",
          "tanggal_perkawinan",
          "nomor_akta_cerai",
          "tanggal_perceraian",
          "cacat",
          "cara_kb",
          "hamil",
          "alamat_sekarang",
        ],
        include: {
          model: desa,
          as: "desa",
          attributes: ["nama_desa", "kepala_desa"],
        },
      });
      if (!data) return super.response(res, 404, "penduduk tidak ditemukan");
      return super.response(res, 200, null, data);
    } catch (er) {
      return super.response(res, 500, er);
    }
  }
  async totalPenduduk(req, res) {
    try {
      const total = await penduduk.countDocuments();
      return super.response(res, 200, null, { total });
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
}

module.exports = new Penduduk();
