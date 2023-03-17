const { Op } = require("sequelize");
const action = require("../../models").action;
const Client = require("./client");
const jwt = require("jsonwebtoken")

class Action extends Client {
  async create(req, res) {
    try {
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const body = req.body;
      action.create(body);
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async edit(req, res) {
    try {
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { id } = req.params;
      const data = await action.findByPk(id);
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      await action.update(req.body, { where: { id } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async delete(req, res) {
    try {
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { id } = req.params;
      const data = await action.findByPk(id);
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      await action.destroy({ where: { id } });
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
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { count, rows } = await action.findAndCountAll({
        attributes:["id","action_name"],
        ...(page !== undefined &&
          limit !== undefined && {
            offset: size,
            limit: parseInt(limit),
          }),
        ...(key !== undefined && {
          where: { action_name: {[Op.substring]:key} },
        }),
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
      return super.response(res, 500, er);
    }
  }
}

module.exports = new Action();
