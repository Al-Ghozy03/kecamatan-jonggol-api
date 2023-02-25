const { validationResult } = require("express-validator");

const validatorMiddleware = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty())
    return res.status(400).json({
      message: "semua field harus diisi",
      error: error.array().map((er) => ({ param: er.param, message: er.msg })),
    });
  next();
};

module.exports = validatorMiddleware;
