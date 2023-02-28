const { default: jwtDecode } = require("jwt-decode");
const hub_keluarga = require("../database/hub_keluarga");
const Client = require("./client");

class HubKeluarga extends Client {
  async create(req, res) {
    try {
     const checkAdmin = jwtDecode(req.cookies.token);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const body = req.body;
      hub_keluarga.create(body);
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
      const data = await hub_keluarga.findByIdAndUpdate(id, { $set: req.body });
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
      const data = await hub_keluarga.findByIdAndDelete(id);
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      const data = await hub_keluarga.find({}, { nama: "$nama" });
      return super.response(res, 200, null, data);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
}

module.exports = new HubKeluarga();
