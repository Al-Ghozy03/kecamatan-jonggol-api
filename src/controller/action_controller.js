const { default: jwtDecode } = require("jwt-decode");
const action = require("../../models").action;
const Client = require("./client");

class Action extends Client {
  async create(req, res) {
    try {
      const checkAdmin = jwtDecode(req.cookies.token);
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
      const checkAdmin = jwtDecode(req.cookies.token);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { id } = req.params;
      const data = await action.findByIdAndUpdate(id, { $set: req.body });
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
      const data = await action.findByIdAndDelete(id);
      if (!data) return super.response(res, 404, "data tidak ditemukan");
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
      const checkAdmin = jwtDecode(req.cookies.token);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const pagination = [];
      const pipeline = [
        { $match: { action_name: { $regex: new RegExp(key, "i") } } },
        {
          $project: {
            action_name: 1,
            description: 1,
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
      const data = await action.aggregate(pipeline);
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
      return super.response(res, 500, er);
    }
  }
}

module.exports = new Action();
