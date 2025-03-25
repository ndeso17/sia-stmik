const renderPage = require("../../Libs/utils/renderPage");
const dashboard = (req, res) => {
  try {
    const data = {
      title: "Home Dashboard",
    };
    renderPage(req, res, "home", data);
  } catch (error) {
    const status = error.status || 500;
    const datas = {
      title: `${status} ${error.message || "Server Error"}`,
      description: "Internal Server Error",
      message: error.message || "Server Error",
      keywords: status.toString(),
      errorCode: status.toString(),
    };
    res.status(status).render("error/page", datas);
  }
};

module.exports = dashboard;
