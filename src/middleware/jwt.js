const jwt = require("jsonwebtoken");
const admin = require("../../models").admin;
const penduduk = require("../../models").penduduk;

async function jwtMiddleware(req, res, next) {
  const { authorization } = req.headers;
  if (authorization === undefined)
    return res.status(401).json({ code: 401, message: "token is required" });
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SIGN, async (err, decode) => {
    if (err) {
      return res.status(401).json({
        message: err.message,
      });
    } else {
      try {
        if (decode.role === "penduduk") {
          const data = await penduduk.findByPk(decode?.id);
          if (!data)
            return res.json({
              message: "user sudah dihapus",
            });
          req.id = decode?.id;
        } else {
          const data = await admin.findByPk(decode?.id);
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
  const { authorization } = req.headers;

  if (authorization === undefined)
    return res.status(401).json({ message: "token is required", token: null });
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SIGN, (er, decode) => {
    if (er?.message === "invalid signature") {
      return res.status(401).json({ message: "invalid token", token: null });
    }

    const { id, role, slug, id_desa } = jwt.decode(token);
    console.log({ id, role, slug, id_desa });
    const newToken = jwt.sign(
      { id, slug, id_desa, role },
      process.env.JWT_SIGN,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).json({ message: "success", token: newToken });
  });
}

module.exports = { jwtMiddleware, authme };
