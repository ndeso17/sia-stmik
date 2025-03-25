require("dotenv").config();
require("module-alias/register");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const os = require("os");
const { exec } = require("child_process");
const DeviceDetector = require("node-device-detector");
const useragent = require("useragent");
const ejs = require("ejs");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
const logs = require("./Middlewares/Logs");

// Middleware untuk deteksi perangkat
app.use((req, res, next) => {
  const agent = useragent.parse(req.headers["user-agent"]);
  const detector = new DeviceDetector({
    clientIndexes: true,
    deviceIndexes: true,
    deviceAliasCode: false,
    deviceTrusted: false,
    deviceInfo: false,
    maxUserAgentSize: 500,
  });
  const result = detector.detect(agent.source);
  req.deviceType = result.device.type; // Misalnya: "desktop", "tablet", "phone"
  next();
});

// Pengaturan View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Apps/Web/Views"));

// Konfigurasi File Statis
app.use("/public", express.static(path.join(__dirname, "Public")));
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);
app.use(
  "/chartjs",
  express.static(path.join(__dirname, "node_modules/chart.js/dist"))
);
app.use(
  "/hamburger",
  express.static(path.join(__dirname, "node_modules/hamburgers/dist"))
);

// Aktivasi Middleware
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "12345678905",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(logs);

//! Routes
const routesWeb = require("./Routes/web");
app.use("/", routesWeb);

// Handler Error
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const datas = {
    title: `${status} ${err.message || "Server Error"}`,
    description: "Internal Server Error",
    message: err.message || "Server Error",
    keywords: status.toString(),
    errorCode: status.toString(),
  };
  res.status(status).render("error/page", datas);
});

// Handler 404
app.use((req, res) => {
  const datas = {
    title: "404 Not Found",
    description: "Apakah kamu tersesat?",
    message:
      "Silahkan kembali ke jalan yang benar, atau hubungi admin untuk dibimbing ke jalan yang benar.",
    keywords: "404",
    errorCode: "404",
  };
  res.status(404).render("error/page", datas);
});

// Memulai Server
const startServer = () => {
  const server = app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${port} sudah digunakan`);
      if (os.platform() === "win32") {
        exec(`netstat -a -n -o | find "${port}"`, (error, stdout) => {
          if (error) {
            console.error(
              `Gagal menemukan proses di port ${port}: ${error.message}`
            );
            process.exit(1);
          } else if (stdout) {
            const pidMatch = stdout.match(/LISTENING\s+(\d+)/);
            if (pidMatch && pidMatch[1]) {
              const pid = pidMatch[1];
              console.log(`Menemukan proses dengan PID ${pid} di port ${port}`);
              exec(`taskkill /PID ${pid} /F`, (killError) => {
                if (killError) {
                  console.error(
                    `Gagal menghentikan proses di port ${port}: ${killError.message}`
                  );
                  process.exit(1);
                } else {
                  console.log(`Proses di port ${port} telah dihentikan`);
                  setTimeout(startServer, 1000);
                }
              });
            } else {
              console.error(`Tidak ada proses ditemukan di port ${port}`);
              process.exit(1);
            }
          } else {
            console.error(`Tidak ada proses ditemukan di port ${port}`);
            process.exit(1);
          }
        });
      } else {
        exec(`fuser -k ${port}/tcp`, (error) => {
          if (error) {
            console.error(
              `Gagal menghentikan proses di port ${port}: ${error.message}`
            );
            process.exit(1);
          } else {
            console.log(`Proses di port ${port} telah dihentikan`);
            setTimeout(startServer, 1000);
          }
        });
      }
    } else {
      console.error(`Kesalahan server: ${err.message}`);
      process.exit(1);
    }
  });
};

startServer();
