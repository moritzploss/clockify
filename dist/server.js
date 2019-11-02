"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
// eslint-disable-next-line no-console
console.log("Server started on port " + process.env.PORT + " at " + new Date().toLocaleTimeString());
app_1.default.listen(process.env.PORT);
