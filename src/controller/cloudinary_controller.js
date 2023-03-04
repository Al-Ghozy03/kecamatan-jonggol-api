const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const crypto = require("crypto");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_API_KEY,
  // secure:true,
});

class Cloudinary {
  post(file, folder) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload(file, {
          folder: `/kecamatan jonggol/${folder}`,
          use_filename: true,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((er) => {
          reject(er);
        });
    });
  }
  postDocument(file, folder) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload(file.path, {
          folder: `/kecamatan jonggol/${folder}`,
          public_id: `${file.originalname.substring(
            0,
            file.originalname.length - 5
          )}-${crypto.randomInt(0, 100000)}`,
          resource_type: "raw",
          format: "docx",
        })
        .then((res) => resolve(res))
        .catch((er) => reject(er));
    });
  }
  async delete(id) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .destroy(id)
        .then((res) => resolve(res))
        .catch((er) => reject(er));
    });
  }
}

module.exports = new Cloudinary();
