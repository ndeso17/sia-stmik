const loginPage = require("../../Controllers/Api/login");
const login = (req, res) => {
  return loginPage(req, res);
};

module.exports = { login };
