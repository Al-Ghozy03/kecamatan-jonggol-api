const { Sequelize } = require("../../models");
const Client = require("./client");
const traffic = require("../../models").traffic;
const penduduk = require("../../models").penduduk;
const desa = require("../../models").desa;

class Traffic extends Client {
  async create(req, res) {
    try {
      await traffic.create({
        user_agent: req.headers["user-agent"],
        ip: req.socket.remoteAddress,
      });
      return super.response(res, 200, null);
    } catch (er) {
      return super.response(res, 500, er);
    }
  }
  async totalPengunjung(req, res) {
    try {
      const months = [
        "januari",
        "februari",
        "maret",
        "april",
        "mei",
        "juni",
        "juli",
        "agustus",
        "september",
        "oktober",
        "november",
        "desember",
      ];
      const total = await traffic.findAndCountAll();
      const data = [];
      for (let i = 0; i < months.length; i++) {
        const { count } = await traffic.findAndCountAll({
          where: {
            createdAt: Sequelize.where(
              Sequelize.fn("MONTH", Sequelize.col("createdAt")),
              i + 1
            ),
          },
        });
        data.push({ [months[i]]: count });
      }
      return super.response(res, 200, null, {
        total_pengunjung: total.count,
        data,
      });
    } catch (er) {
      console.log(er);
    }
  }
  async totalPendaftar(req, res) {
    try {
      const data = [];
      const datadesa = await desa.findAll();
      for (let i = 0; i < datadesa.length; i++) {
        const { count } = await penduduk.findAndCountAll({
          where: { id_desa: datadesa[i].id },
        });
        data.push({ [datadesa[i].nama_desa]: count });
      }
      return super.response(res, 200, null, data);
    } catch (er) {
      console.log(er);
    }
  }
}

module.exports = new Traffic();
