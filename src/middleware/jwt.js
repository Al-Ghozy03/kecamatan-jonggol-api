const jwt = require("jsonwebtoken");
const admin = require("../database/admin");
const penduduk = require("../database/penduduk");

async function jwtMiddleware(req, res, next) {
  const { authorization } = req.headers;
  if (authorization == undefined)
    return res.status(401).json({ code: 401, message: "token is required" });
  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SIGN, async (err, decode) => {
    if (err) {
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
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SIGN, async (err, decode) => {
      if (err) {
        return res.status(401).json({
          message: "fail",
          data: err,
        });
      } else {
        const newToken = jwt.sign(
          { email: decode?.email },
          process.env.JWT_SIGN
        );
        res.json({
          data: newToken,
        });
      }
    });
  } catch (er) {
    console.log(er);
    return res.status(401).json({
      message: er,
    });
  }
}

module.exports = { jwtMiddleware, authme };
