"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDB = void 0;
const mongoose = require("mongoose");
class MongoDB {
    async connect(connection) {
        const dbOptions = {
            autoIndex: false,
            poolSize: 10,
            bufferMaxEntries: 0,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        };
        try {
            return await mongoose.connect(connection, dbOptions);
        }
        catch (error) {
            console.log(`Mongoose connection error : ${error}`);
        }
    }
}
exports.MongoDB = MongoDB;
