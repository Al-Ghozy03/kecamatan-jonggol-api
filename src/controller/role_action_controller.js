const role = require("../../models").role;
const action = require("../../models").action;
const role_action = require("../../models").role_action;
const Client = require("./client");
const jwt = require("jsonwebtoken")

class RoleAction extends Client {
  async create(req, res) {
    try {
      const { id_role, id_action } = req.body;
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const checkRole = await role.findByPk(id_role);
      const checkAction = await action.findByPk(id_action);
      if (!checkRole) return super.response(res, 404, "role tidak ditemukan");
      if (!checkAction)
        return super.response(res, 404, "action tidak ditemukan");
      const check = await role_action.findOne({
        where: { id_role, id_action },
      });
      if (check) return super.response(res, 400, "role action sudah terdaftar");
      const body = req.body;
      role_action.create(body);
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
      const { id_role, id_action } = req.body;
      const data = await role_action.findByPk(id);
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      const checkRole = await role.findByPk(id_role);
      const checkAction = await action.findByPk(id_action);
      if (!checkRole) return super.response(res, 404, "role tidak ditemukan");
      if (!checkAction)
        return super.response(res, 404, "action tidak ditemukan");
      const check = await role_action.findOne({
        where: { id_role, id_action },
      });
      if (check) return super.response(res, 400, "role action sudah terdaftar");
      await role_action.update({ id_role, id_action }, { where: { id } });
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
      const data = await role_action.findByPk(id);
      if (!data) return super.response(res, 404, "data tidak ditemukan");
      await role_action.destroy({ where: { id } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      const { page, limit } = req.query;
      const size = (parseInt(page) - 1) * parseInt(limit);
      const checkAdmin = jwt.decode(req.headers.authorization.split(" ")[1]);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { count, rows } = await role.findAndCountAll({
        attributes: ["id", "role_name"],
        ...(page !== undefined &&
          limit !== undefined && {
            offset: size,
            limit: parseInt(limit),
          }),
        include: [
          {
            model: role_action,
            as: "role_action",
            attributes: ["id_role", "id_action"],
            include: {
              model: action,
              as: "action",
              attributes: ["action_name", "description"],
            },
          },
        ],
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
      return super.responseWithPagination(res, 500, er);
    }
  }
}

module.exports = new RoleAction();
