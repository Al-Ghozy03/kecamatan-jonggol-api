const penduduk = require("../database/penduduk");
const Client = require("./client");
const bcrypt = require("bcrypt");

class Penduduk extends Client {
  async register(req, res) {
    try {
      const body = req.body;
      const check = await penduduk.findOne({ nik: body.nik });
      if (check) return super.response(res, 404, "nik sudah terdaftar");
      body.password = await bcrypt.hashSync(body.password, 12);
      await penduduk.create(body);
      return super.response(res, 200, "ok");
    } catch (er) {
      console.log(er);
      return res.status(500).json({ message: er });
    }
  }
}

module.exports = new Penduduk();
