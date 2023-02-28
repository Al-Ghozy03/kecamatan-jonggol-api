const { default: jwtDecode } = require("jwt-decode");
const role = require("../database/role");
const action = require("../database/action");
const role_action = require("../database/role_action");
const Client = require("./client");

class RoleAction extends Client {
  async create(req, res) {
    try {
      const { id_role, id_action } = req.body;
     const checkAdmin = jwtDecode(req.cookies.token);
      if (checkAdmin.role !== "admin" )
        return super.response(res, 401, "invalid token");
      const checkRole = await role.findById(id_role);
      const checkAction = await action.findById(id_action);
      if (!checkRole) return super.response(res, 404, "role tidak ditemukan");
      if (!checkAction)
        return super.response(res, 404, "action tidak ditemukan");

      const check = await role_action.findOne({ id_role, id_action });
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
     const checkAdmin = jwtDecode(req.cookies.token);
      if (checkAdmin.role !== "admin" )
        return super.response(res, 401, "invalid token");
      const { id } = req.params;
      const data = await role_action.findByIdAndUpdate(id, { $set: req.body });
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
      if (checkAdmin.role !== "admin" )
        return super.response(res, 401, "invalid token");
      const { id } = req.params;
      const data = await role_action.findByIdAndDelete(id);
      if (!data) return super.response(res, 404, "data tidak ditemukan");
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
     const checkAdmin = jwtDecode(req.cookies.token);
      if (checkAdmin.role !== "admin" )
        return super.response(res, 401, "invalid token");
      const pagination = [];
      const pipeline = [
        {
          $lookup: {
            from: "roles",
            localField: "id_role",
            foreignField: "_id",
            as: "role",
            pipeline: [{ $project: { role_name: 1 } }],
          },
        },
        {
          $lookup: {
            from: "actions",
            localField: "id_action",
            foreignField: "_id",
            as: "action",
            pipeline: [{ $project: { action_name: 1 } }],
          },
        },
        {
          $project: {
            role: 1,
            action: 1,
          },
        },
        { $unwind: "$role" },
        { $unwind: "$action" },
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
      const data = await role_action.aggregate(pipeline);
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
      return super.responseWithPagination(res, 500, er);
    }
  }
}

module.exports = new RoleAction();
