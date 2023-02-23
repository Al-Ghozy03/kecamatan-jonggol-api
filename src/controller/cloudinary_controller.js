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
  async post(file, folder) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(file, {
      folder: `/siforsa/${folder}`,
      use_filename: true,
    });
    return { secure_url, public_id };
  }
  async postDocument(file, folder) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      {
        folder: `/siforsa/${folder}`,
        public_id: `${file.originalname.substring(
          0,
          file.originalname.length - 5
        )}-${crypto.randomInt(0, 100000)}`,
        resource_type: "raw",
        format: "docx",
      }
    );
    return { secure_url, public_id };
  }
  async delete(id) {
    await cloudinary.uploader.destroy(id);
  }
}

module.exports = new Cloudinary();
