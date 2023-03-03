const { default: jwtDecode } = require("jwt-decode");
const { default: mongoose } = require("mongoose");
const berita = require("../../models/berita");
const Client = require("./client");
const cloudinary_controller = require("./cloudinary_controller");

class Berita extends Client {
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
          "berita"
        );
        body.id_admin = jwtDecode(req.cookies.token).id;
        body.thumbnail = secure_url;
        body.id_thumbnail = public_id;
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
      const { id } = req.params;
      const checkAdmin = jwtDecode(req.cookies.token);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const check = await berita.findByIdAndDelete(id);
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
      const check = await berita.findById(id);
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
        } else {
          return super.response(
            res,
            400,
            "file harus berekstensi .jpg, .jpeg, .png"
          );
        }
      }
      await berita.updateOne({ _id: id }, { $set: { ...body } });
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
      const pagination = [];
      const pipeline = [
        {
          $match: {
            ...(key !== undefined && { judul: { $regex: key, $options: "i" } }),
          },
        },
        {
          $lookup: {
            from: "admins",
            localField: "id_admin",
            foreignField: "_id",
            as: "author",
            pipeline: [{ $project: { email: 1, nama: 1 } }],
          },
        },
        { $unwind: "$author" },
        {
          $project: {
            judul: 1,
            konten: 1,
            thumbnail: 1,
            author: 1,
            createdAt: 1,
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
      const data = await berita.aggregate(pipeline);
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
      return super.responseWithPagination(res, 500, er);
    }
  }
  async detail(req, res) {
    try {
      const { id } = req.params;
      const data = await berita.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: "admins",
            localField: "id_admin",
            foreignField: "_id",
            as: "author",
            pipeline: [{ $project: { email: 1 } }],
          },
        },
        { $unwind: "$author" },
        {
          $project: {
            judul: 1,
            konten: 1,
            thumbnail: 1,
            author: 1,
            createdAt: 1,
          },
        },
      ]);
      if (!data[0]) return super.response(res, 404, "data tidak ditemukan");
      return super.response(res, 200, null, data[0]);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
}

module.exports = new Berita();
