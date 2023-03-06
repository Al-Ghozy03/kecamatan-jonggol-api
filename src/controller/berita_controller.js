const { default: jwtDecode } = require("jwt-decode");
const { Op } = require("sequelize");
const berita = require("../../models").berita;
const admin = require("../../models").admin;
const Client = require("./client");
const cloudinary_controller = require("./cloudinary_controller");
const convert = require("./convert");

class Berita extends Client {
  async create(req, res) {
    try {
      const body = req.body;
      const checkAdmin = jwtDecode(req.headers.authorization);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      if (
        req.file.mimetype === "image/png" ||
        req.file.mimetype === "image/jpeg" ||
        req.file.mimetype === "image/jpg"
      ) {
        const { secure_url, public_id } = await cloudinary_controller.post(
          req.file.path,
          "berita"
        );
        body.id_admin = jwtDecode(req.headers.authorization).id;
        body.thumbnail = secure_url;
        body.id_thumbnail = public_id;
        body.slug = convert.toSlug(body.judul);
        await berita.create(body);
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
      const check = await berita.findOne({ where: { slug } });
      if (!check) return super.response(res, 404, "data tidak ditemukan");
      await cloudinary_controller.delete(check.id_thumbnail);
      await berita.destroy({ where: { slug } });
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
      const check = await berita.findOne({ where: { slug } });
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
            "berita"
          );
          body.thumbnail = secure_url;
          body.id_thumbnail = public_id;
          if (body.judul !== undefined) {
            body.slug = convert.toSlug(body.judul);
          }
        } else {
          return super.response(
            res,
            400,
            "file harus berekstensi .jpg, .jpeg, .png"
          );
        }
      }
      if (body.judul !== undefined) {
        body.slug = convert.toSlug(body.judul);
      }
      await berita.update(body, { where: { slug } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      const { page, limit, key, sort } = req.query;
      const size = (parseInt(page) - 1) * parseInt(limit);
      const { rows, count } = await berita.findAndCountAll({
        attributes: ["slug", "judul", "konten", "thumbnail"],
        ...(sort !== undefined && {
          order: [["createdAt", sort === "terbaru" ? "DESC" : "ASC"]],
        }),
        ...(page !== undefined &&
          limit !== undefined && {
            offset: size,
            limit: parseInt(limit),
          }),
        ...(key !== undefined && {
          where: { judul: { [Op.substring]: key } },
        }),
        include: {
          model: admin,
          as: "author",
          attributes: ["email", "username"],
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
      const data = await berita.findOne({
        attributes: ["slug", "judul", "konten", "thumbnail"],
        where: { slug },
        include: {
          model: admin,
          as: "author",
          attributes: ["email", "username"],
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

module.exports = new Berita();
