const path = require("path");
const ejs = require("ejs");

const renderPage = (req, res, view, data = {}) => {
  try {
    const pathView = req.app.get("views");
    let tipeDevice;
    // const deviceType = req.deviceType || "desktop";
    // console.log("Device Type:", deviceType);
    // if (deviceType === "smartphone") {
    //   tipeDevice = "mobile";
    // } else {
    //   tipeDevice = deviceType;
    // }

    tipeDevice = "desktop";
    const contentPath = path.join(pathView, view, "page.ejs");
    const layoutPath = path.join(
      __dirname,
      "../../Apps/Web/Layouts",
      `${tipeDevice}.ejs`
    );

    ejs.renderFile(contentPath, data, (err, content) => {
      if (err) {
        console.error(`Error rendering content (${contentPath}):`, err);
        return res.status(500).send("Internal Server Error");
      }
      res.render(layoutPath, { content, ...data }, (err, html) => {
        if (err) {
          console.error(`Error rendering layout (${layoutPath}):`, err);
          return res.status(500).send("Internal Server Error");
        }
        res.send(html);
      });
    });
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

module.exports = renderPage;
