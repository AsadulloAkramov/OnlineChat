"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("./Application");
const dotenv = require("dotenv");
dotenv.config();
const options = {
    host: process.env.HOST,
    port: Number(process.env.PORT),
    mongoUrl: process.env.CHAT_MONGO_URL
};
const app = new Application_1.Application(options);
app.start();
process.on("SIGINT", () => {
    app.shutdown();
});
