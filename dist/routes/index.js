"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var spotify = require("../spotify/apiTools");
var authentification = require("../controllers/authentification");
var authorization = require("../controllers/authorization");
var express = require('express');
var router = express.Router();
var makeSomeChanges = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            return [2 /*return*/, res.render('afterLogin')];
        }
        catch (error) {
            return [2 /*return*/, next(error)];
        }
        return [2 /*return*/];
    });
}); };
router.get('/login', authentification.loginWithSpotify);
router.get('/callback', authentification.verifySpotifyState, authentification.saveSpotifyCodeToSession);
router.get('/', authorization.requireLogin, makeSomeChanges);
var byDuration = function (track1, track2) { return ((track1.duration < track2.duration) ? -1 : 1); };
var filterTrackData = function (tracks) { return (tracks.map(function (item) { return ({
    duration: item.track.duration_ms,
    id: item.track.id,
    name: item.track.name,
}); })); };
var getMeanTrackLength = function (tracks) { return (Math.round(tracks.reduce(function (acc, curr) { return acc + curr.duration; }, 0) / tracks.length)); };
var getTrackByDuration = function (tracks, duration) {
    var closest = tracks.reduce(function (prev, curr) {
        return (Math.abs(curr.duration - duration) < Math.abs(prev.duration - duration) ? curr : prev);
    });
    return closest;
};
var getNewTracks = function (userTracks, targetDuration) {
    if (targetDuration === void 0) { targetDuration = 60000 * 30; }
    var sortedTracks = filterTrackData(userTracks).sort(byDuration);
    var targetLength = getMeanTrackLength(sortedTracks);
    var numberOfTracks = Math.round(targetDuration / targetLength);
    var tracksToAdd = [];
    var i = 0;
    var timeLeft = targetDuration;
    while (i <= numberOfTracks) {
        targetLength = Math.round(timeLeft / (numberOfTracks - i));
        var closest = getTrackByDuration(sortedTracks, targetLength);
        tracksToAdd.push("spotify:track:" + closest.id);
        sortedTracks.splice(sortedTracks.indexOf(closest), 1);
        timeLeft -= closest.duration;
        i += 1;
    }
    return tracksToAdd;
};
router.post('/create', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var apiInstance, userPlaylists, listDetails, appPlaylist, userTracks, newTracks, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, spotify.newApiInstance(req.session.spotifyCode)];
            case 1:
                apiInstance = _a.sent();
                return [4 /*yield*/, spotify.getUserPlaylists(apiInstance)];
            case 2:
                userPlaylists = _a.sent();
                listDetails = userPlaylists.body.items.map(function (_a) {
                    var id = _a.id, name = _a.name;
                    return ({ name: name, id: id });
                });
                appPlaylist = listDetails.find(function (list) { return list.name === process.env.PLAYLIST_NAME; });
                if (!!appPlaylist) return [3 /*break*/, 4];
                return [4 /*yield*/, spotify.createPlaylist(apiInstance, process.env.PLAYLIST_NAME)];
            case 3:
                appPlaylist = _a.sent();
                _a.label = 4;
            case 4: return [4 /*yield*/, spotify.getNUserTracks(apiInstance, 500)];
            case 5:
                userTracks = _a.sent();
                newTracks = getNewTracks(userTracks);
                return [4 /*yield*/, spotify.replaceTracksInPlaylist(apiInstance, appPlaylist.id, newTracks)];
            case 6:
                _a.sent();
                return [2 /*return*/, res.json(newTracks)];
            case 7:
                error_1 = _a.sent();
                return [2 /*return*/, next(error_1)];
            case 8: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
