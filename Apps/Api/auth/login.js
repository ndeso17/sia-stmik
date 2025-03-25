const login = async (datas) => {
  try {
    if (!datas) {
      return res.status(400).json({ message: "Error login" });
    }
    return res.status(200).json({ message: "Success login" });
  } catch (error) {
    console.error("Error login : ", error);
    return res.status(500).json({ message: "Error login" });
  }
};

module.exports = login;
