const { default: jwtDecode } = require("jwt-decode");
const { default: mongoose } = require("mongoose");
const galeri = require("../database/gallery");
const Client = require("./client");
const cloudinary_controller = require("./cloudinary_controller");

class Galeri extends Client {
  async create(req, res) {
    try {
      const body = req.body;
      const checkAdmin = jwtDecode(req.cookies.token);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      if (
        req.file.mimetype === "image/png" ||
        req.file.mimetype === "image/jpeg" ||
        req.file.mimetype === "image/jpg"
      ) {
        const { secure_url, public_id } = await cloudinary_controller.post(
          req.file.path,
          "galeri"
        );
        body.thumbnail = secure_url;
        body.id_thumbnail = public_id;
        await galeri.create(body);
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
      const { id } = req.params;
      const checkAdmin = jwtDecode(req.cookies.token);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const check = await galeri.findByIdAndDelete(id);
      if (!check) return super.response(res, 404, "data tidak ditemukan");
      cloudinary_controller.delete(check.id_thumbnail);
      return super.response(res, 200);
    } catch (er) {
      return super.response(res, 500, er);
    }
  }
  async edit(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;
      const checkAdmin = jwtDecode(req.cookies.token);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const check = await galeri.findById(id);
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
            "galeri"
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
      await galeri.updateOne({ _id: id }, { $set: { ...body } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      const { id_album, page, limit } = req.query;
      const size = (parseInt(page) - 1) * parseInt(limit);
      const count = await galeri.countDocuments({
        ...(id_album !== undefined && { id_album }),
      });
      const data = await galeri
        .find(
          { ...(id_album !== undefined && { id_album }) },
          {
            nama: "$nama",
            deskripsi: "$deskripsi",
            thumbnail: "$thumbnail",
            createdAt: "$createdAt",
          }
        )
        .skip(size)
        .limit(parseInt(limit));
      return super.responseWithPagination(
        res,
        200,
        null,
        data,
        count,
        Math.ceil(count / parseInt(limit)),
        parseInt(page)
      );
    } catch (er) {
      console.log(er);
      return super.responseWithPagination(res, 500, er);
    }
  }
  async detail(req, res) {
    try {
      const { id } = req.params;
      const data = await galeri.findById(id);
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      return super.response(res, 200, null, data);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
}

module.exports = new Galeri();
