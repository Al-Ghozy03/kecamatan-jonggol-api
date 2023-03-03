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
  responseWithToken(res, code, message, data = null, token = null) {
    if (code === 200) {
      message = "success";
    }
    return res.status(code).json({
      message,
      token,
      data,
    });
  }
  responseWithPagination(
    res,
    code,
    message,
    data = null,
    total,
    total_page,
    active_page
  ) {
    if (code === 200) {
      message = "success";
    }
    if (!total) total = 0;
    if (!total_page) total_page = 0;
    if (!active_page) active_page = 0;
    return res.status(code).json({
      message,
      total,
      total_page,
      active_page,
      data,
    });
  }
}

module.exports = Client;
