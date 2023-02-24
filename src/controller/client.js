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
