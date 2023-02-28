const { default: jwtDecode } = require("jwt-decode");
const desa = require("../database/desa");
const Client = require("./client");

class Desa extends Client {
  async create(req, res) {
    try {
     const checkAdmin = jwtDecode(req.cookies.token);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const body = req.body;
      desa.create(body);
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async edit(req, res) {
    try {
     const checkAdmin = jwtDecode(req.cookies.token);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { id } = req.params;
      const data = await desa.findByIdAndUpdate(id, { $set: req.body });
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async delete(req, res) {
    try {
     const checkAdmin = jwtDecode(req.cookies.token);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { id } = req.params;
      const data = await desa.findByIdAndDelete(id);
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      const data = await desa.find(
        {},
        {
          nama_desa: "$nama_desa",
          kepala_desa: "$kepala_desa",
          longtitude: "$longtitude",
          latitude: "$latitude",
        }
      );
      return super.response(res, 200, null, data);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
}

module.exports = new Desa();
