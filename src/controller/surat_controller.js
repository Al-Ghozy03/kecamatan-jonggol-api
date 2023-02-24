const { default: jwtDecode } = require("jwt-decode");
const layanan = require("../database/layanan");
const penduduk = require("../database/penduduk");
const Client = require("./client");

class Surat extends Client {
  async create(req, res) {
    try {
      const date = new Date();
      const month = [
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
        "X",
        "XI",
        "XII",
      ];
      const body = req.body;
      const checkPenduduk = await penduduk.findById(
        jwtDecode(req.headers.authorization).id
      );
      const checkLayanan = await layanan.findById(req.body.id_layanan);
      if (!checkPenduduk)
        return super.response(res, 404, "penduduk tidak ditemukan");
      if (!checkLayanan)
        return super.response(res, 404, "layanan tidak ditemukan");
      body.id_penduduk = jwtDecode(req.headers.authorization).id;
      body.bulan = month[date.getMonth()];
      body.tahun = date.getFullYear();
      body.nomor_surat = crypto.randomInt(0, 1000);
      await suratmodel.create(body);
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
}

module.exports = new Surat();
