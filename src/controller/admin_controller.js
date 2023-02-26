const admin = require("../database/admin");
const Client = require("./client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: jwtDecode } = require("jwt-decode");
require("dotenv").config();

class Admin extends Client {
  async register(req, res) {
    try {
      let body = req.body;
      const check = await admin.findOne({ email: body.email });
      if (check) return super.response(res, 400, "email sudah terdaftar");
      body.password = await bcrypt.hashSync(body.password, 10);
      const data = await admin.create(body);
      const token = jwt.sign(
        { id: data._id, role: "admin" },
        process.env.JWT_SIGN,
        { expiresIn: "1d" }
      );
      res.cookie("token", token, { httpOnly: true });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const check = await admin.findOne({ email });
      if (!check) return super.response(res, 404, "email tidak ditemukan");
      const verify = await bcrypt.compareSync(password, check.password);
      if (!verify) return super.response(res, 400, "password salah");
      const token = jwt.sign(
        { id: check._id, role: "admin" },
        process.env.JWT_SIGN,
        { expiresIn: "1d" }
      );
      res.cookie("token", token, { httpOnly: true });
      return super.response(res, 200);
    } catch (er) {
      return super.response(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      const { page, limit, key } = req.query;
      const size = (parseInt(page) - 1) * parseInt(limit);
      const checkAdmin = jwtDecode(req.headers.authorization);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const pagination = [];
      const pipeline = [
        { $match: { email: { $regex: new RegExp(key, "i") } } },
        {
          $lookup: {
            from: "role_actions",
            localField: "id_role",
            foreignField: "id_role",
            as: "role_action",
            pipeline: [
              { $project: { id_role: 1, id_action: 1 } },
              {
                $lookup: {
                  from: "actions",
                  localField: "id_action",
                  foreignField: "_id",
                  as: "action",
                  pipeline: [{ $project: { action_name: 1, description: 1 } }],
                },
              },
              {
                $lookup: {
                  from: "roles",
                  localField: "id_role",
                  foreignField: "_id",
                  as: "roles",
                  pipeline: [{ $project: { role_name: 1 } }],
                },
              },
            ],
          },
        },
        {
          $project: {
            email: 1,
            role_action: 1,
          },
        },
        {
          $facet: {
            data: pagination,
            total: [{ $count: "count" }],
          },
        },
      ];
      if (page !== undefined && limit !== undefined) {
        pagination.push(
          {
            $skip: size,
          },
          {
            $limit: parseInt(limit),
          }
        );
      }
      const data = await admin.aggregate(pipeline);
      const count = await admin.countDocuments({
        ...(key !== undefined && {
          email: { $regex: key, $options: "i" },
        }),
      });
      return super.responseWithPagination(
        res,
        200,
        null,
        data[0].data,
        data[0].total.length === 0 ? 0 : data[0].total[0].count,
        Math.ceil(
          data[0].total.length === 0
            ? 0
            : data[0].total[0].count / parseInt(limit)
        ),
        parseInt(parseInt(page))
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
