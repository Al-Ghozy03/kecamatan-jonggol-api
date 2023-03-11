const { default: jwtDecode } = require("jwt-decode");
const { Op } = require("sequelize");
const umkm = require("../../models").umkm;
const desa = require("../../models").desa;
const penduduk = require("../../models").penduduk;
const Client = require("./client");

class Umkm extends Client {
  async create(req, res) {
    try {
      const checkAdmin = jwtDecode(req.headers.authorization);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const body = req.body;
      const checkDesa = await desa.findByPk(body.id_desa);
      if (!checkDesa) return super.response(res, 404, "desa tidak ditemukan");
      umkm.create(body);
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
      const { id } = req.params;
      const data = await umkm.findByPk(id);
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      if (req.body.id_desa !== undefined) {
        const checkDesa = await desa.findByPk(req.body.id_desa);
        if (!checkDesa) return super.response(res, 404, "desa tidak ditemukan");
      }
      await umkm.update(req.body, { where: { id } });
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
      const { id } = req.params;
      const data = await umkm.findByPk(id);
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      await umkm.destroy({ where: { id } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      const { page, limit, id_desa, jenis_produk } = req.query;
      const size = (parseInt(page) - 1) * parseInt(limit);

      const checkAdmin = jwtDecode(req.headers.authorization);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { count, rows } = await umkm.findAndCountAll({
        where: {
          ...(jenis_produk !== undefined && { jenis_produk }),
          ...(id_desa !== undefined && { id_desa }),
        },
        ...(page !== undefined &&
          limit !== undefined && {
            offset: size,
            limit: parseInt(limit),
          }),
        include: [
          {
            model: desa,
            attributes: ["nama_desa", "kepala_desa", "longtitude", "latitude"],
          },
          {
            model: penduduk,
            attributes: ["nama", "alamat", "rt", "rw", "jenis_kelamin"],
            as: "pemilik",
          },
        ],
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
}

module.exports = new Umkm();
