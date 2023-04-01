const { Op } = require("sequelize");
const agenda = require("../../models").agenda;
const desa = require("../../models").desa;
const Client = require("./client");
const cloudinary_controller = require("./cloudinary_controller");
const convert = require("./convert");
const jwt = require("jsonwebtoken")

class Agenda extends Client {
  async create(req, res) {
    try {
      const body = req.body;
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const checkDesa = await desa.findByPk(body.id_desa);
      if (!checkDesa) return super.response(res, 404, "desa tidak ditemukan");
      if (
        req.file.mimetype === "image/png" ||
        req.file.mimetype === "image/jpeg" ||
        req.file.mimetype === "image/jpg"
      ) {
        const { secure_url, public_id } = await cloudinary_controller.post(
          req.file.path,
          "agenda"
        );
        body.thumbnail = secure_url;
        body.id_thumbnail = public_id;
        body.slug = convert.toSlug(body.nama_agenda);
        await agenda.create(body);
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
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const check = await agenda.findOne({ where: { slug } });
      if (!check) return super.response(res, 404, "data tidak ditemukan");
      await cloudinary_controller.delete(check.id_thumbnail);
      await agenda.destroy({ where: { slug } });
      return super.response(res, 200);
    } catch (er) {
      return super.response(res, 500, er);
    }
  }
  async edit(req, res) {
    try {
      const { slug } = req.params;
      const body = req.body;
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const check = await agenda.findOne({ where: { slug } });
      if (!check) return super.response(res, 404, "data tidak ditemukan");
      if (body.id_desa !== undefined) {
        const checkDesa = await desa.findByPk(body.id_desa);
        if (!checkDesa) return super.response(res, 404, "desa tidak ditemukan");
      }
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
            "agenda"
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
      if (body.nama_agenda !== undefined) {
        body.slug = convert.toSlug(body.nama_agenda);
      }
      await agenda.update(body, { where: { slug } });
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
      const { rows, count } = await agenda.findAndCountAll({
        attributes: [
          "slug",
          "nama_agenda",
          "start",
          "end",
          "tanggal",
          "tempat",
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
          where: { nama_agenda: { [Op.substring]: key } },
        }),
        include: {
          model: desa,
          attributes: ["id","nama_desa", "kepala_desa", "latitude", "longtitude"],
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
      const { slug } = req.params;
      const data = await agenda.findOne({
        where: { slug },
        attributes: [
          "slug",
          "nama_agenda",
          "start",
          "end",
          "tanggal",
          "tempat",
          "deskripsi",
          "thumbnail",
          "createdAt",
        ],
        include: {
          model: desa,
          attributes: ["id","nama_desa", "kepala_desa", "latitude", "longtitude"],
        },
      });
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      return super.response(res, 200, null, data);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
}

module.exports = new Agenda();
