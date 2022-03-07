"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const Express = require("express");
const mongoose = require("mongoose");
const Http = require("http");
const bodyParser = require("body-parser");
const Cors = require("cors");
const Colors = require("colors");
const Routes_1 = require("./Routes");
const MongoDBModule_1 = require("./modules/MongoDBModule");
class Application {
    constructor(options) {
        this.shutdown = () => {
            this.http.close((err) => {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                mongoose.connection.close(() => {
                    process.exit(0);
                });
            });
        };
        this.host = options.host;
        this.port = options.port;
        this.mongoUrl = options.mongoUrl;
    }
    async start() {
        await this.dbConnect();
        await this.startExpress();
        await this.startSocket();
    }
    async dbConnect() {
        const mongodb = new MongoDBModule_1.MongoDB();
        this.db = await mongodb.connect(this.mongoUrl);
    }
    async startExpress() {
        let corsOptions = {
            origin: "*",
            methods: "GET,PUT,POST,PATCH,DELETE,OPTIONS",
            allowedHeaders: ["Content-Type", "Authorization", "Lang"],
            preflightContinue: false,
            optionsSuccessStatus: 204,
        };
        this.express = Express();
        this.express.use(bodyParser.json({ limit: "50mb" }));
        this.express.use(Cors(corsOptions));
        this.express.use(Routes_1.default);
        this.http = Http.createServer(this.express);
        this.http.listen(this.port, console.log(Colors.rainbow(`Server running on http://${this.host}:${this.port}`)));
    }
    async startSocket() {
    }
}
exports.Application = Application;
