"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var showWelcome = function (req, res, next) {
    try {
        return res.render('afterLogin');
    }
    catch (error) {
        return next(error);
    }
};
exports.showWelcome = showWelcome;
