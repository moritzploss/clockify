"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var showHome = function (req, res, next) {
    try {
        return res.render('afterLogin');
    }
    catch (error) {
        return next(error);
    }
};
exports.default = showHome;
