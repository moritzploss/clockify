"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hoursToMinutes = function (hours) { return hours * 60; };
var minutesToSeconds = function (minutes) { return minutes * 60; };
var userInputToMilliseconds = function (_a) {
    var hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
    var secsFromSecs = Number(seconds);
    var secsFromMins = minutesToSeconds(Number(minutes));
    var secsFromHrs = minutesToSeconds(hoursToMinutes(Number(hours)));
    return (secsFromSecs + secsFromMins + secsFromHrs) * 1000;
};
exports.default = userInputToMilliseconds;
