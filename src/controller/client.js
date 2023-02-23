class Client {
  response(res, code, message, data = null,other) {
    if (code === 200) {
      message = "success";
    }
    return res.status(code).json({
      message,
      ...other,
      data,
    });
  }
}

module.exports = Client;
