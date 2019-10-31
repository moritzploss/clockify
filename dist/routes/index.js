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
router.post('/create', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var targetDuration, instance, user, playlists, playlistDetails, playlist, tracks, trackDetails, duration, i, tracksToAdd, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                targetDuration = 60000 * 30;
                return [4 /*yield*/, spotify.newApiInstance(req.session.spotifyCode)];
            case 1:
                instance = _a.sent();
                return [4 /*yield*/, spotify.getUser(instance)];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, spotify.getUserPlaylists(instance)];
            case 3:
                playlists = _a.sent();
                playlistDetails = playlists.body.items.map(function (_a) {
                    var id = _a.id, name = _a.name;
                    return ({ name: name, id: id });
                });
                playlist = playlistDetails.find(function (playlists) { return playlists.name === process.env.PLAYLIST_NAME; });
                return [4 /*yield*/, spotify.getUserTracks(instance, 50, 2)];
            case 4:
                tracks = _a.sent();
                trackDetails = tracks.body.items.map(function (_a) {
                    var track = _a.track;
                    return ({
                        duration: track.duration_ms,
                        id: track.id,
                    });
                });
                if (!!playlist) return [3 /*break*/, 6];
                return [4 /*yield*/, spotify.createPlaylist(instance, process.env.PLAYLIST_NAME)];
            case 5:
                playlist = _a.sent();
                _a.label = 6;
            case 6:
                duration = 0;
                i = 0;
                tracksToAdd = [];
                while (duration < targetDuration) {
                    tracksToAdd.push("spotify:track:" + trackDetails[i].id);
                    duration += trackDetails[i].duration;
                    i += 1;
                }
                console.log(playlist.id);
                // console.log(playlists.body.items);
                return [4 /*yield*/, spotify.addSongsToPlaylist(instance, playlist.id, tracksToAdd)];
            case 7:
                // console.log(playlists.body.items);
                _a.sent();
                return [2 /*return*/, res.json(trackDetails)];
            case 8:
                error_1 = _a.sent();
                return [2 /*return*/, next(error_1)];
            case 9: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
