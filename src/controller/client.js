class Client {
  response(res, code, message, data = null) {
    if (code === 200) {
      message = "success";
    }
    return res.status(code).json({
      message,
      data,
    });
  }
}

module.exports = Client;
