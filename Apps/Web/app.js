const dashboardPage = require("../../Controllers/Web/dashboard");
const dashboard = (req, res) => {
  return dashboardPage(req, res);
};

module.exports = { dashboard };
