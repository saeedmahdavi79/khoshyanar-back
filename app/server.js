const swaggerUI = require("swagger-ui-express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const { allRouted } = require("./routers/router");
const { default: mongoose } = require("mongoose");
const morgan = require("morgan");
const createError = require("http-errors");
var device = require("express-device");

//server applicaton config
class Appliation {
  #express = require("express");
  #app = this.#express();
  #DB_URI;
  #PORT;
  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApplication();
    this.createServer();
    this.createRoutes();
    this.connectToMongoDB();
    this.errorHandler();
  }
  configApplication() {
    const path = require("path");
    this.#app.use(cookieParser());
    this.#app.use(morgan("dev"));
    this.#app.use(this.#express.json());
    this.#app.use(device.capture());

    this.#app.use(
      cors({
        origin: [
          "*",
          "http://localhost:6200",
          "https://afracrm.pro",
          "https://afrapardaz.com",
          "http://localhost:3000",
          "http://localhost:3001",
          "http://192.168.2.2",
          "http://192.168.2.2:3000",
        ],
        optionsSuccessStatus: 200,
        credentials: true,
      })
    );

    this.#app.use(this.#express.urlencoded({ extended: true }));
    this.#app.use(this.#express.static(path.join(__dirname, "..", "public")));
    this.#app.use(
      "/restapi",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJSDoc({
          swaggerDefinition: {
            info: {
              title: "AfraCrm",
              version: "1.0.1",
              description: "Developed By Afra Cpmpany (2024)",
              contact: {
                name: "AfraCrm",
                url: "https://Afracrm.pro/",
              },
            },

            servers: [
              {
                url: ["http://localhost:7200"],
              },
            ],
          },
          apis: ["./app/routers/**/*.js"],
        })
      )
    );
  }
  createServer() {
    const http = require("http");
    const server = http.createServer(this.#app);
    server.listen(this.#PORT, () => {
      console.log(`server run > on port ${this.#PORT}`);
    });
  }

  connectToMongoDB() {
    mongoose
      .connect(this.#DB_URI)
      .then(() => {
        console.log("Connected To Database");
      })
      .catch((error) => {
        console.error("Disconnected From Database:", error);
      });
    mongoose.connection.on("connected", () => {
      console.log("Connected To Database");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected From Database:");
    });

    process.on("SIGINT", async () => {
      console.log("Disconnected");
      await mongoose.connection.close();
      process.exit(0);
    });
  }

  errorHandler() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound("آدرس مورد نظر یافت نشد"));
    });
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "آدرس یا ریشه یافت نشد",
      });
    });
    this.#app.use((error, req, res, next) => {
      console.log(error);
      const status = error?.status || 500;
      const message = error?.message || "خطای داخلی سرور";
      res.status(status).json({
        status,
        success: false,
        message,
      });
    });
  }
  createRoutes() {
    this.#app.use(allRouted);
  }
}

module.exports = Appliation;
