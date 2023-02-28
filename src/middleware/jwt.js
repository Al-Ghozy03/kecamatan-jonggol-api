const jwt = require("jsonwebtoken");
const { default: jwtDecode } = require("jwt-decode");
const admin = require("../database/admin");
const penduduk = require("../database/penduduk");

async function jwtMiddleware(req, res, next) {
  const { token } = req.cookies;
  if (token === undefined)
    return res.status(401).json({ code: 401, message: "token is required" });

  jwt.verify(token, process.env.JWT_SIGN, async (err, decode) => {
    if (err) {
      if (err.message === "jwt expired")
        return res.status(401).json({
          message: "token expired",
        });
      return res.status(401).json({
        message: "invalid token",
      });
    } else {
      try {
        if (decode.role === "penduduk") {
          const data = await penduduk.findById(decode?.id);
          if (!data)
            return res.json({
              message: "user sudah dihapus",
            });
          req.id = decode?.id;
        } else {
          const data = await admin.findById(decode?.id);
          if (!data)
            return res.json({
              message: "user sudah dihapus",
            });
          req.id = decode?.id;
        }
        next();
      } catch (er) {
        console.log(er);
        return res.status(500).json({
          message: er,
        });
      }
    }
  });
}
async function authme(req, res) {
  const { token } = req.cookies;
  if (token === undefined)
    return res.status(401).json({ message: "token is required", token: null });
  jwt.verify(token, process.env.JWT_SIGN, (er, decode) => {
    if (er?.message === "invalid signature") {
      return res.status(401).json({ message: "invalid token", token: null });
    }
    const { id, role } = jwtDecode(token);
    const newToken = jwt.sign({ id, role }, process.env.JWT_SIGN, {
      expiresIn: "1d",
    });
    res.cookie("token", newToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });
    return res.status(200).json({ message: "success", token: newToken });
  });
}

module.exports = { jwtMiddleware, authme };
