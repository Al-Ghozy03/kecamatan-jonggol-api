const { Op } = require("sequelize");
const pegawai = require("../../models").pegawai;
const Client = require("./client");
const cloudinary_controller = require("./cloudinary_controller");
const convert = require("./convert");
const jwt = require("jsonwebtoken")

class Pegawai extends Client {
  async create(req, res) {
    try {
      const body = req.body;
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      if (
        req.file.mimetype === "image/png" ||
        req.file.mimetype === "image/jpeg" ||
        req.file.mimetype === "image/jpg"
      ) {
        const { secure_url, public_id } = await cloudinary_controller.post(
          req.file.path,
          "pegawai"
        );
        body.pass_foto = secure_url;
        body.id_foto = public_id;
        body.slug = convert.toSlug(body.nama);
        await pegawai.create(body);
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
      const check = await pegawai.findOne({ where: { slug } });
      if (!check) return super.response(res, 404, "data tidak ditemukan");
      await cloudinary_controller.delete(check.id_foto);
      await pegawai.destroy({ where: { slug } });
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
      const check = await pegawai.findOne({ where: { slug } });
      if (!check) return super.response(res, 404, "data tidak ditemukan");
      if (req?.file?.path === undefined) {
        body.pass_foto = check.pass_foto;
        body.id_foto = check.id_foto;
      } else {
        if (
          req.file.mimetype === "image/png" ||
          req.file.mimetype === "image/jpeg" ||
          req.file.mimetype === "image/jpg"
        ) {
          await cloudinary_controller.delete(check.id_foto);
          const { public_id, secure_url } = await cloudinary_controller.post(
            req.file.path,
            "pegawai"
          );
          body.pass_foto = secure_url;
          body.id_foto = public_id;
        } else {
          return super.response(
            res,
            400,
            "file harus berekstensi .jpg, .jpeg, .png"
          );
        }
      }
      if (body.nama !== undefined) {
        body.slug = convert.toSlug(body.nama);
      }
      await pegawai.update(body, { where: { slug } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      const { page, limit, key, status } = req.query;
      const size = (parseInt(page) - 1) * parseInt(limit);
      const { rows, count } = await pegawai.findAndCountAll({
        attributes: [
          "slug",
          "nama",
          "email",
          "tempat_lahir",
          "tanggal_lahir",
          "status",
          "no_ktp",
          "no_hp",
          "jenis_kelamin",
          "agama",
          "status_kawin",
          "jabatan",
          "pangkat",
          "pendidikan",
          "alamat",
          "pass_foto",
        ],
        ...(page !== undefined &&
          limit !== undefined && {
            offset: size,
            limit: parseInt(limit),
          }),
        where: {
          ...(key !== undefined && {
            nama: { [Op.substring]: key },
          }),
          ...(status !== undefined && { status }),
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
      const data = await pegawai.findOne({
        attributes: [
          "slug",
          "nama",
          "email",
          "tempat_lahir",
          "tanggal_lahir",
          "status",
          "no_ktp",
          "no_hp",
          "jenis_kelamin",
          "agama",
          "status_kawin",
          "jabatan",
          "pangkat",
          "pendidikan",
          "alamat",
          "pass_foto",
        ],
        where: { slug },
      });
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      return super.response(res, 200, null, data);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async total(req, res) {
    try {
      const { status } = req.query;
      const { count } = await pegawai.findAndCountAll({
        ...(status !== undefined && { where: { status } }),
      });
      return super.response(res, 200, null, count);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
}

module.exports = new Pegawai();
