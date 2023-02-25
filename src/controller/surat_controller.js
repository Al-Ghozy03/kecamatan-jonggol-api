const { default: jwtDecode } = require("jwt-decode");
const layanan = require("../database/layanan");
const penduduk = require("../database/penduduk");
const surat = require("../database/surat");
const Client = require("./client");
const crypto = require("crypto");
const desa = require("../database/desa");
const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");

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
      const checkDesa = await desa.findById(checkPenduduk.id_desa);
      body.kepala_desa = checkDesa._id;
      body.id_penduduk = jwtDecode(req.headers.authorization).id;
      body.bulan = month[date.getMonth()];
      body.tahun = date.getFullYear();
      body.nomor_surat = crypto.randomInt(0, 1000);
      await surat.create(body);
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async get(req, res) {
    try {
      const {
        status,
        page,
        limit,
        nomor_surat,
        bulan,
        tahun,
        nama,
        layanan,
        desa,
      } = req.query;
      const size = (parseInt(page) - 1) * parseInt(limit);
      const pagination = [];
      const pipeline = [
        {
          $match: {
            ...(status !== undefined && { status }),
            ...(nomor_surat !== undefined && {
              nomor_surat: parseInt(nomor_surat),
            }),
            ...(bulan !== undefined && { bulan }),
            ...(tahun !== undefined && { tahun }),
          },
        },
        {
          $lookup: {
            from: "penduduks",
            localField: "id_penduduk",
            foreignField: "_id",
            as: "pembuat",
            pipeline: [
              { $project: { nama: 1, nik: 1, id_desa: 1 } },
              {
                $match: {
                  ...(nama !== undefined && {
                    nama: { $regex: nama, $options: "i" },
                  }),
                  ...(desa !== undefined && {
                    id_desa: mongoose.Types.ObjectId(desa),
                  }),
                },
              },
            ],
          },
        },
        { $unwind: "$pembuat" },

        {
          $lookup: {
            from: "layanans",
            localField: "id_layanan",
            foreignField: "_id",
            as: "layanan",
            pipeline: [
              { $project: { nama: 1, syarat: 1, template: 1 } },
              {
                $match: {
                  ...(layanan !== undefined && {
                    nama: { $regex: layanan, $options: "i" },
                  }),
                },
              },
            ],
          },
        },
        { $unwind: "$layanan" },
        {
          $lookup: {
            from: "desas",
            localField: "kepala_desa",
            foreignField: "_id",
            as: "kepala_desa",
            pipeline: [{ $project: { nama_desa: 1, kepala_desa: 1, _id: 0 } }],
          },
        },
        { $unwind: "$kepala_desa" },
        {
          $project: {
            nomor_surat: 1,
            bulan: 1,
            tahun: 1,
            status: 1,
            pembuat: 1,
            layanan: 1,
            kepala_desa: 1,
            createdAt: 1,
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
      const data = await surat.aggregate(pipeline);
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
      return super.responseWithPagination(res, 500, er, null);
    }
  }
  async detail(req, res) {
    try {
      const { id } = req.params;
      const data = await surat.aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: "penduduks",
            localField: "id_penduduk",
            foreignField: "_id",
            as: "pembuat",
            pipeline: [
              { $project: { nama: 1, nik: 1, id_desa: 1 } },
            ],
          },
        },
        { $unwind: "$pembuat" },

        {
          $lookup: {
            from: "layanans",
            localField: "id_layanan",
            foreignField: "_id",
            as: "layanan",
            pipeline: [
              { $project: { nama: 1, syarat: 1, template: 1 } },
            ],
          },
        },
        { $unwind: "$layanan" },
        {
          $lookup: {
            from: "desas",
            localField: "kepala_desa",
            foreignField: "_id",
            as: "kepala_desa",
            pipeline: [{ $project: { nama_desa: 1, kepala_desa: 1, _id: 0 } }],
          },
        },
        { $unwind: "$kepala_desa" },
        {
          $project: {
            nomor_surat: 1,
            bulan: 1,
            tahun: 1,
            status: 1,
            pembuat: 1,
            layanan: 1,
            kepala_desa: 1,
            createdAt: 1,
          },
        },
      ]);
      return super.response(res, 200, null, data);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async edit(req, res) {
    try {
      const checkAdmin = jwtDecode(req.headers.authorization);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { id } = req.params;
      const body = req.body;
      const check = await surat.findById(id);
      if (!check) return super.response(res, 404, "surat tidak ditemukan");
      await surat.updateOne({ _id: id }, { $set: { status: body.status } });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
  async delete(req, res) {
    try {
      const checkAdmin = jwtDecode(req.headers.authorization);
      if (checkAdmin.role !== "admin")
        return super.response(res, 401, "invalid token");
      const { id } = req.params;
      const check = await surat.findById(id);
      if (!check) return super.response(res, 404, "surat tidak ditemukan");
      await surat.deleteOne({ _id: id });
      return super.response(res, 200);
    } catch (er) {
      console.log(er);
      return super.response(res, 500, er);
    }
  }
}

module.exports = new Surat();
