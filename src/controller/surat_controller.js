const layanan = require("../../models").layanan;
const penduduk = require("../../models").penduduk;
const surat = require("../../models").surat;
const desa = require("../../models").desa;
const Client = require("./client");
const jwt = require("jsonwebtoken")
const crypto = require("crypto");

class Surat extends Client {
  async create(req, res) {
    try {
      const checkRole = jwt.decode(req.headers.authorization.split(" ")[1]).role;
      if (checkRole !== "penduduk")
        return super.response(res, 401, "invalid token");
      const date = new Date();
      const month = [
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
        "X",
        "XI",
        "XII",
      ];
      const body = req.body;
      const checkPenduduk = await penduduk.findByPk(
        jwt.decode(req.headers.authorization.split(" ")[1]).id
      );
      const checkLayanan = await layanan.findByPk(body.id_layanan);
      if (!checkPenduduk)
        return super.response(res, 404, "penduduk tidak ditemukan");
      if (!checkLayanan)
        return super.response(res, 404, "layanan tidak ditemukan");
      const checkDesa = await desa.findByPk(body.id_desa);
      if (!checkDesa) return super.response(res, 404, "desa tidak ditemukan");
      body.id_desa = checkDesa.id;
      body.id_penduduk = jwt.decode(req.headers.authorization.split(" ")[1]).id;
      body.bulan = month[date.getMonth()];
      body.tahun = date.getFullYear();
      body.nomor_surat = crypto.randomInt(0, 100000);
      await surat.create(body);
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      const {
        status,
        page,
        limit,
        nomor_surat,
        bulan,
        tahun,
        id_layanan,
        id_desa,
      } = req.query;
      const size = (parseInt(page) - 1) * parseInt(limit);
      const { count, rows } = await surat.findAndCountAll({
        attributes: ["nomor_surat", "bulan", "tahun", "status", "createdAt"],
        ...(page !== undefined &&
          limit !== undefined && {
            limit: parseInt(limit),
            offset: size,
          }),
        where: {
          ...(id_desa !== undefined && { id_desa }),
          ...(id_layanan !== undefined && { id_layanan }),
          ...(tahun !== undefined && { tahun }),
          ...(bulan !== undefined && { bulan }),
          ...(nomor_surat !== undefined && { nomor_surat }),
          ...(status !== undefined && { status }),
        },
        include: [
          {
            model: penduduk,
            attributes: ["nama", "nik", "alamat"],
          },
          {
            model: desa,
            attributes: ["nama_desa", "kepala_desa", "longtitude", "latitude"],
          },
          {
            model: layanan,
            attributes: ["nama", "syarat","template"],
          },
        ],
      });
      return super.responseWithPagination(
        res,
        200,
        null,
        rows.map((e) => ({
          ...e.dataValues,
          layanan: {
            nama: e.dataValues.layanan.nama,
            syarat: JSON.parse(e.dataValues.layanan.syarat),
          },
        })),
        count,
        Math.ceil(count / parseInt(limit)),
        parseInt(parseInt(page))
      );
    } catch (er) {
      console.log(er);
      return super.responseWithPagination(res, 500, er, null);
    }
  }
  async edit(req, res) {
    try {
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { id } = req.params;
      const body = req.body;
      const check = await surat.findOne({ where: { nomor_surat: id } });
      if (!check) return super.response(res, 404, "surat tidak ditemukan");
      await surat.update(
        { status: body.status },
        { where: { nomor_surat: id } }
      );
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async delete(req, res) {
    try {
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { id } = req.params;
      const check = await surat.findOne({ where: { nomor_surat: id } });
      if (!check) return super.response(res, 404, "surat tidak ditemukan");
      await surat.destroy({ where: { nomor_surat: id } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async total(req,res){
    try {
      const {count} = await surat.findAndCountAll()
      return super.response(res,200,null,count)
    } catch (er) {
      console.log(er);
      return super.response(res,500,er)
    }
  }
}

module.exports = new Surat();
