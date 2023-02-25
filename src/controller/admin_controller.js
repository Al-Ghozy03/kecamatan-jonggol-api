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
      // const check = await admin.findOne({ email: body.email });
      // if (check) return super.response(res, 400, "email sudah terdaftar");
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

      // const verify = await bcrypt.compareSync(password, check.password);
      // if (!verify) return super.response(res, 400, "password salah");
      const token = jwt.sign(
        { id: check._id, role: "admin" },
        process.env.JWT_SIGN,
        { expiresIn: "1h" }
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
      const pipeline = [
        { $match: { email: { $regex: new RegExp(key, "i") } } },
        {
          $lookup: {
            from: "roles",
            localField: "id_role",
            foreignField: "_id",
            as: "role",
            pipeline: [
              {
                $project: {
                  role_name: 1,
                },
              },
            ],
          },
        },
        { $unwind: "$role" },
        {
          $project: {
            email: 1,
            role: 1,
          },
        },
      ];
      if (page !== undefined && limit !== undefined) {
        pipeline.push(
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
        data,
        count,
        Math.ceil(count / parseInt(limit)),
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
