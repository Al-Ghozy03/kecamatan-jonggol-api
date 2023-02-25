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
      const pagination = [];
      const pipeline = [
        {
          $match: {
            ...(key !== undefined && {
              $or: [
                { nama: { $regex: key, $options: "i" } },
                { nik: { $regex: key, $options: "i" } },
              ],
            }),
          },
        },
        {
          $lookup: {
            from: "desas",
            localField: "id_desa",
            foreignField: "_id",
            as: "desa_asal",
            pipeline: [{ $project: { nama_desa: 1, kepala_desa: 1 } }],
          },
        },
        { $unwind: "$desa_asal" },
        {
          $project: {
            nama: 1,
            rt: 1,
            rw: 1,
            dusun: 1,
            nomor_kk: 1,
            nik: 1,
            jenis_kelamin: 1,
            tempat_lahir: 1,
            tanggal_lahir: 1,
            agama: 1,
            pendidikan_dalam_kk: 1,
            pendidikan_sedang_ditempuh: 1,
            pekerjaan: 1,
            kawin: 1,
            hubungan_keluarga: 1,
            kewarganegaraan: 1,
            nama_ayah: 1,
            nama_ibu: 1,
            golongan_darah: 1,
            akta_lahir: 1,
            nomor_dokumen_paspor: 1,
            tanggal_akhir_passport: 1,
            nomor_dokumen_KITAS: 1,
            nik_ayah: 1,
            nik_ibu: 1,
            nomor_akta_perkawinan: 1,
            tanggal_perkawinan: 1,
            nomor_akta_cerai: 1,
            tanggal_perceraian: 1,
            cacat: 1,
            cara_kb: 1,
            hamil: 1,
            alamat_sekarang: 1,
            desa_asal: 1,
          },
        },
        {
          $facet: {
            data: pagination,
            total: [{ $count: "count" }],
          },
        },
      ];
      if (page !== undefined && limit !== undefined) {
        pagination.push(
          {
            $skip: size,
          },
          {
            $limit: parseInt(limit),
          }
        );
      }
      const data = await penduduk.aggregate(pipeline);
      return super.responseWithPagination(
        res,
        200,
        null,
        data[0].data,
        data[0].total.length === 0 ? 0 : data[0].total[0].count,
        Math.ceil(
          data[0].total.length === 0
            ? 0
            : data[0].total[0].count / parseInt(limit)
        ),
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
