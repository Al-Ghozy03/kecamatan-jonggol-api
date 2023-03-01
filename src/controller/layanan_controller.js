const { default: jwtDecode } = require("jwt-decode");
const layanan = require("../database/layanan");
const Client = require("./client");
const cloudinary_controller = require("./cloudinary_controller");

class Layanan extends Client {
  async create(req, res) {
    try {
      const body = req.body;
      const checkAdmin = jwtDecode(req.cookies.token);
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
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const body = req.body;
      const { id } = req.params;
      const data = await layanan.findById(id);
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
      await layanan.updateOne({ _id: id }, { $set: { ...body } });
      return res.status(200).json({ code: 200, message: "success" });
    } catch (er) {
      console.log(er);
      return res.status(500).json({ code: 500, message: er });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const check = await layanan.findById(id);
      if (!check) return super.response(res, 404, "layanan tidak ditemukan");
      await cloudinary_controller.delete(check.id_template);
      await layanan.deleteOne({ _id: id });
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
      const data = await layanan
        .find(
          {
            ...(key !== undefined && {
              nama: { $regex: key, $options: "i" },
            }),
          },
          {
            nama: "$nama",
            syarat: "$syarat",
            template: "$template",
            id_template: "$id_template",
          }
        )
        .skip(size)
        .limit(parseInt(limit));
      const count = await layanan.countDocuments({
        ...(key !== undefined && {
          nama: { $regex: key, $options: "i" },
        }),
      });
      return super.responseWithPagination(
        res,
        200,
        null,
        data,
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
