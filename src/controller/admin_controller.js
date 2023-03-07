const admin = require("../../models").admin;
const role = require("../../models").role;
const action = require("../../models").action;
const roleaction = require("../../models").role_action;
const Client = require("./client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: jwtDecode } = require("jwt-decode");
const { Op } = require("sequelize");
require("dotenv").config();

class Admin extends Client {
  async register(req, res) {
    try {
      let body = req.body;
      const check = await admin.findOne({ where: { email: body.email } });
      const checkRole = await role.findByPk(body.id_role);
      if (check) return super.response(res, 400, "email sudah terdaftar");
      if (!checkRole) return super.response(res, 404, "role tidak ditemukan");
      body.password = await bcrypt.hashSync(body.password, 10);
      await admin.create(body);
      return super.response(res, 200, null);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const check = await admin.findOne({ where: { email } });
      const data = await admin.findOne({
        attributes: ["email", "username"],
        where: { email },
        include: [
          {
            model: role,
            as: "role",
            attributes: ["role_name"],
            include: {
              model: roleaction,
              as: "role_action",
              attributes: ["id"],
              include: {
                model: action,
                as: "action",
                attributes: ["action_name", "description"],
              },
            },
          },
        ],
      });
      if (!check)
        return super.responseWithToken(res, 404, "email tidak ditemukan");
      const verify = await bcrypt.compareSync(password, check.password);
      if (!verify) return super.responseWithToken(res, 400, "password salah");
      const token = jwt.sign(
        { id: check.id, slug: check.slug, role: "admin" },
        process.env.JWT_SIGN,
        { expiresIn: "1d" }
      );
      return super.responseWithToken(res, 200, null, data, token);
    } catch (er) {
      console.log(er);
      return super.responseWithToken(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      const { page, limit, key } = req.query;
      const size = (parseInt(page) - 1) * parseInt(limit);
      const checkAdmin = jwtDecode(req.headers.authorization);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { count, rows } = await admin.findAndCountAll({
        attributes: ["slug", "email", "username"],
        ...(page !== undefined &&
          limit !== undefined && {
            limit: parseInt(limit),
            offset: size,
          }),
        ...(key !== undefined && {
          where: { email: { [Op.substring]: key } },
        }),
        include: [
          {
            model: role,
            as: "role",
            attributes: ["role_name"],
            include: {
              model: roleaction,
              as: "role_action",
              attributes: ["id"],
              include: {
                model: action,
                as: "action",
                attributes: ["action_name", "description"],
              },
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
        parseInt(page)
      );
    } catch (er) {
      console.log(er);
      return res.status(500).json({
        code: 500,
        message: er,
        total: 0,
        total_page: 0,
        active_page: 0,
        data: null,
      });
    }
  }
}

module.exports = new Admin();
