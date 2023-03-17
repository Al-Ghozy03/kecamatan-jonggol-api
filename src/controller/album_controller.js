const jwt = require("jsonwebtoken")
const album = require("../../models").album;
const galeri = require("../../models").galeri;
const Client = require("./client");
const convert = require("./convert");

class Album extends Client {
  async create(req, res) {
    try {
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const body = req.body;
      body.slug = convert.toSlug(body.nama_album);
      album.create(body);
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async edit(req, res) {
    try {
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { slug } = req.params;
      const data = await album.findOne({ where: { slug } });
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      req.body.slug = convert.toSlug(req.body.nama_album);
      await album.update(
        { nama_album: req.body.nama_album },
        { where: { slug } }
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
      const { slug } = req.params;
      const data = await album.findOne({ where: { slug } });
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      await album.destroy({ where: { slug } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      const { page, limit } = req.query;
      const size = (parseInt(page) - 1) * parseInt(limit);
      const { rows, count } = await album.findAndCountAll({
        attributes: ["id", "slug", "nama_album", "createdAt"],
        ...(page !== undefined &&
          limit !== undefined && {
            offset: size,
            limit: parseInt(limit),
          }),
        include: {
          model: galeri,
          as: "cover",
          attributes: ["slug", "thumbnail"],
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
      const data = await album.findOne({
        where: { slug },
        attributes: ["id", "slug", "nama_album", "createdAt"],
        include: {
          model: galeri,
          as: "cover",
          attributes: ["slug", "thumbnail"],
        },
      });
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      return super.response(res, 200, null, data);
    } catch (er) {
      console.log(er);
      return super.responseWithPagination(res, 500, er);
    }
  }
}

module.exports = new Album();
