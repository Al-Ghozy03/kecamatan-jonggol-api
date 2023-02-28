const { authme } = require("../middleware/jwt");
const router = require("express")();

router.get("/authme", authme);

module.exports = { auth_router: router };
