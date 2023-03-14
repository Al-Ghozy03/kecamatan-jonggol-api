const { Op } = require("sequelize");
const { Sequelize } = require("../../models");
const Client = require("./client");
const traffic = require("../../models").traffic;

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
  async total(req, res) {
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
      return super.response(res, 200, null, data);
    } catch (er) {
      console.log(er);
    }
  }
}

module.exports = new Traffic();
