const { default: jwtDecode } = require("jwt-decode");
const { Op } = require("sequelize");
const sekolah = require("../../models").sekolah;
const desa = require("../../models").desa;
const Client = require("./client");
const convert = require("./convert");

class Sekolah extends Client {
  async create(req, res) {
    try {
      const checkAdmin = jwtDecode(req.headers.authorization);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const body = req.body;
      const checkDesa = await desa.findByPk(body.id_desa);
      if (!checkDesa) return super.response(res, 404, "desa tidak ditemukan");
      body.slug = convert.toSlug(body.nama_sekolah);
      sekolah.create(body);
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async edit(req, res) {
    try {
      const checkAdmin = jwtDecode(req.headers.authorization);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { slug } = req.params;
      const data = await sekolah.findOne({ where: { slug } });
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      if (req.body.id_desa !== undefined) {
        const checkDesa = await desa.findByPk(req.body.id_desa);
        if (!checkDesa) return super.response(res, 404, "desa tidak ditemukan");
      }
      if (req.body.nama_sekolah !== undefined) {
        req.body.slug = convert.toSlug(req.body.nama_sekolah);
      }
      await sekolah.update(req.body, { where: { slug } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async delete(req, res) {
    try {
      const checkAdmin = jwtDecode(req.headers.authorization);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { slug } = req.params;
      const data = await sekolah.findOne({ where: { slug } });
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      await sekolah.destroy({ where: { slug } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      // const checkAdmin = jwtDecode(req.headers.authorization);
      const { page, limit, id_desa, status, bentuk_pendidikan, nama_sekolah } =
        req.query;
      const size = (parseInt(page) - 1) * parseInt(limit);

      // if (checkAdmin.role !== "admin")
      //   return super.response(res, 401, "invalid token");
      const { count, rows } = await sekolah.findAndCountAll({
        attributes: [
          "slug",
          "nama_sekolah",
          "npsn",
          "bentuk_pendidikan",
          "status",
          "alamat",
        ],
        where: {
          ...(status !== undefined && { status }),
          ...(bentuk_pendidikan !== undefined && { bentuk_pendidikan }),
          ...(id_desa !== undefined && { id_desa }),
          ...(nama_sekolah !== undefined && {
            nama_sekolah: { [Op.substring]: nama_sekolah },
          }),
        },
        ...(page !== undefined &&
          limit !== undefined && {
            offset: size,
            limit: parseInt(limit),
          }),
        include: {
          model: desa,
          attributes: ["nama_desa", "kepala_desa", "longtitude", "latitude"],
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
  async total(req, res) {
    try {
      const { bentuk_pendidikan } = req.query;
      const { count } = await sekolah.findAndCountAll({
        ...(bentuk_pendidikan !== undefined && {
          where: { id_desa: bentuk_pendidikan },
        }),
      });
      return super.response(res, 200, null, count);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
}

module.exports = new Sekolah();
