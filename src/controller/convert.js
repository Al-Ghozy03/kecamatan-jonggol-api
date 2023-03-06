const crypto = require("crypto");
const slug = require("slug");

class Convert {
  toSlug(v) {
    return slug(`${v}-${crypto.randomInt(0,100000)}-${crypto.randomBytes(40)}`);
  }
}

module.exports = new Convert();
