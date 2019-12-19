"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
app_1.default.listen(process.env.PORT);
var time = new Date().toLocaleTimeString();
var address = "http://localhost:" + process.env.PORT;
process.stdout.write("started at " + time + " at " + address);
