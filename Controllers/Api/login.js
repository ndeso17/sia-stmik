const masuk = require("../../Apps/Api/auth/login");
const login = async (req, res) => {
  try {
    const datas = {
      username: req.body.username,
      password: req.body.password,
      pin: req.body.pin,
    };
    await masuk(datas);
  } catch (error) {
    console.error("Error Controller login : ", error);
    return res.status(500).json({ message: "Error Controller login" });
  }
};

module.exports = login;
