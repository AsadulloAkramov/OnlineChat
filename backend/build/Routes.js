"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
function nestedRoutes(path, configure) {
    const router = Express.Router({ mergeParams: true });
    configure(router);
    return router;
}
Express.application["prefix"] = nestedRoutes;
Express.Router["prefix"] = nestedRoutes;
const routes = Express.Router({ mergeParams: true });
exports.default = routes;
