const { default: jwtDecode } = require("jwt-decode");
const { Op } = require("sequelize");
const potensi_desa = require("../../models").potensi_desa;
const desa = require("../../models").desa;
const penduduk = require("../../models").penduduk;
const Client = require("./client");
const cloudinary_controller = require("./cloudinary_controller");
const convert = require("./convert");

class PotensiDesa extends Client {
  async create(req, res) {
    try {
      const body = req.body;
      const checkAdmin = jwtDecode(req.headers.authorization);
      if (checkAdmin.role !== "penduduk")
        return super.response(res, 401, "invalid token");
      if (
        req.file.mimetype === "image/png" ||
        req.file.mimetype === "image/jpeg" ||
        req.file.mimetype === "image/jpg"
      ) {
        const { secure_url, public_id } = await cloudinary_controller.post(
          req.file.path,
          "potensi desa"
        );
        const checkDesa = await desa.findByPk(body.id_desa);
        if (!checkDesa) return super.response(res, 404, "desa tidak ditemukan");
        body.id_penduduk = jwtDecode(req.headers.authorization).id;
        body.thumbnail = secure_url;
        body.id_thumbnail = public_id;
        body.slug = convert.toSlug(body.nama_potensi);
        await potensi_desa.create(body);
        return super.response(res, 200);
      }
      return super.response(
        res,
        400,
        "file harus berekstensi .jpg, .jpeg, .png"
      );
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async delete(req, res) {
    try {
      const { slug } = req.params;
      const checkAdmin = jwtDecode(req.headers.authorization);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const check = await potensi_desa.findOne({ where: { slug } });
      if (!check) return super.response(res, 404, "data tidak ditemukan");
      await cloudinary_controller.delete(check.id_thumbnail);
      await potensi_desa.destroy({ where: { slug } });
      return super.response(res, 200);
    } catch (er) {
      return super.response(res, 500, er);
    }
  }
  async edit(req, res) {
    try {
      const { slug } = req.params;
      const body = req.body;
      const checkAdmin = jwtDecode(req.headers.authorization);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const check = await potensi_desa.findOne({ where: { slug } });
      if (!check) return super.response(res, 404, "data tidak ditemukan");
      if (req?.file?.path === undefined) {
        body.thumbnail = check.thumbnail;
        body.id_thumbnail = check.id_thumbnail;
      } else {
        if (
          req.file.mimetype === "image/png" ||
          req.file.mimetype === "image/jpeg" ||
          req.file.mimetype === "image/jpg"
        ) {
          await cloudinary_controller.delete(check.id_thumbnail);
          const { public_id, secure_url } = await cloudinary_controller.post(
            req.file.path,
            "potensi desa"
          );
          body.thumbnail = secure_url;
          body.id_thumbnail = public_id;
        } else {
          return super.response(
            res,
            400,
            "file harus berekstensi .jpg, .jpeg, .png"
          );
        }
      }
      if (body.nama_potensi !== undefined) {
        body.slug = convert.toSlug(body.nama_potensi);
      }
      await potensi_desa.update(body, { where: { slug } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      const { page, limit, key } = req.query;
      const size = (parseInt(page) - 1) * parseInt(limit);
      const { rows, count } = await potensi_desa.findAndCountAll({
        attributes: [
          "slug",
          "nama_potensi",
          "kategori",
          "deskripsi",
          "thumbnail",
          "createdAt",
        ],
        ...(page !== undefined &&
          limit !== undefined && {
            offset: size,
            limit: parseInt(limit),
          }),
        ...(key !== undefined && {
          where: { nama_potensi: { [Op.substring]: key } },
        }),
        include: [
          {
            model: penduduk,
            attributes: ["nama", "nik", "alamat"],
          },
          {
            model: desa,
            attributes: ["nama_desa", "kepala_desa", "longtitude", "latitude"],
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
  async detail(req, res) {
    try {
      const { slug } = req.params;
      const data = await potensi_desa.findOne({
        attributes: [
          "slug",
          "nama_potensi",
          "kategori",
          "deskripsi",
          "thumbnail",
          "createdAt",
        ],
        where: { slug },
        include: [
          {
            model: penduduk,
            attributes: ["nama", "nik", "alamat"],
          },
          {
            model: desa,
            attributes: ["nama_desa", "kepala_desa", "longtitude", "latitude"],
          },
        ],
      });
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      return super.response(res, 200, null, data);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
}

module.exports = new PotensiDesa();
