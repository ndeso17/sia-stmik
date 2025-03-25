const express = require("express");
const router = express.Router();
const app = require("../Apps/Web/app");

router.get("/", app.dashboard);
router.get("/dashboard", app.dashboard);

module.exports = router;
