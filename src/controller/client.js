class Client {
  response(res, code, message) {
    return res.status(code).json({
      code,
      message,
    });
  }
}

module.exports = Client;
