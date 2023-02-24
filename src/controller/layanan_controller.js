const { default: jwtDecode } = require("jwt-decode");
const layanan = require("../database/layanan");
const Client = require("./client");
const cloudinary_controller = require("./cloudinary_controller");

class Layanan extends Client {
  async create(req, res) {
    try {
      const body = req.body;
      const checkAdmin = jwtDecode(req.headers.authorization);
      if (checkAdmin.role !== "admin")
        return super.response(res, 404, "invalid token");
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
}

module.exports = new Layanan();
