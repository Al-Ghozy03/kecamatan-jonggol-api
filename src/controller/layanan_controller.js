const { default: jwtDecode } = require("jwt-decode");
const { Op } = require("sequelize");
const layanan = require("../../models").layanan;
const Client = require("./client");
const cloudinary_controller = require("./cloudinary_controller");

class Layanan extends Client {
  async create(req, res) {
    try {
      const body = req.body;
      const checkAdmin = jwtDecode(req.headers.authorization);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      if (
        req.file.mimetype !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      )
        return super.response(res, 400, "file harus berekstensi .docx");
      const { public_id, secure_url } =
        await cloudinary_controller.postDocument(req.file, "template");
      body.template = secure_url;
      body.id_template = public_id;
      await layanan.create(body);
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
      const body = req.body;
      const { id } = req.params;
      const data = await layanan.findByPk(id);
      if (!data) super.response(res, 404, "layanan tidak ditemukan");
      if (req?.file?.path === undefined) {
        body.template = data.template;
        body.id_template = data.id_template;
      } else {
        if (
          req.file.mimetype !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        )
          return super.response(res, 400, "file harus berekstensi .docx");
        await cloudinary_controller.delete(data.id_template);
        const { public_id, secure_url } =
          await cloudinary_controller.postDocument(req.file, "template");
        body.template = secure_url;
        body.id_template = public_id;
      }
      await layanan.update(body, { where: { id } });
      return super.response(res, 200, null);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const check = await layanan.findByPk(id);
      if (!check) return super.response(res, 404, "layanan tidak ditemukan");
      await cloudinary_controller.delete(check.id_template);
      await layanan.destroy({ where: { id } });
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
      const { rows, count } = await layanan.findAndCountAll({
        attributes: ["id", "nama", "syarat", "template"],
        ...(page !== undefined &&
          limit !== undefined && {
            offset: size,
            limit: parseInt(limit),
          }),
        ...(key !== undefined && {
          where: { nama: { [Op.substring]: key } },
        }),
      });
      return super.responseWithPagination(
        res,
        200,
        null,
        rows.map((e) => ({
          ...e.dataValues,
          syarat: JSON.parse(e.dataValues.syarat),
        })),
        count,
        Math.ceil(count / parseInt(limit)),
        parseInt(parseInt(page))
      );
    } catch (er) {
      console.log(er);
      super.responseWithPagination(res, 500, er);
    }
  }
}

module.exports = new Layanan();
