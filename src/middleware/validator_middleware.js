const { validationResult } = require("express-validator");

const validatorMiddleware = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty())
    return res
      .status(422)
      .json({ code: 422, message: "failed", error: error.mapped() });
  next();
};

module.exports = validatorMiddleware;
