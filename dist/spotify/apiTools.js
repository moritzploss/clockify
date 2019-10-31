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
var spotifyConfig = require("./config");
var logger = require('../logging/logging').logger;
var spotifyApi = spotifyConfig.apiWithCredentials();
var getAccessToken = function (spotifyCode) { return __awaiter(void 0, void 0, void 0, function () {
    var body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger.info('attempting to get authoriazation code grant');
                return [4 /*yield*/, spotifyApi.authorizationCodeGrant(spotifyCode)];
            case 1:
                body = (_a.sent()).body;
                return [2 /*return*/, body.access_token];
        }
    });
}); };
exports.getAccessToken = getAccessToken;
var newApiInstance = function (accessToken) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        logger.info('attempting to set access token');
        spotifyApi.setAccessToken(accessToken);
        return [2 /*return*/, spotifyApi];
    });
}); };
exports.newApiInstance = newApiInstance;
var getUser = function (apiInstance) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        logger.info('attempting to get user');
        return [2 /*return*/, apiInstance.getMe()];
    });
}); };
exports.getUser = getUser;
var getUserPlaylists = function (apiInstance) { return __awaiter(void 0, void 0, void 0, function () {
    var body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getUser(apiInstance)];
            case 1:
                body = (_a.sent()).body;
                logger.info('attempting to getUserPlaylists');
                return [2 /*return*/, apiInstance.getUserPlaylists(body.id)];
        }
    });
}); };
exports.getUserPlaylists = getUserPlaylists;
var addSongsToPlaylist = function (apiInstance, playlist, songArray) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        logger.info('attempting to add songs to user playlist');
        return [2 /*return*/, apiInstance.addTracksToPlaylist(playlist, songArray)];
    });
}); };
exports.addSongsToPlaylist = addSongsToPlaylist;
var replaceTracksInPlaylist = function (apiInstance, playlist, tracks) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        logger.info('attempting to replace tracks in user playlist');
        return [2 /*return*/, apiInstance.replaceTracksInPlaylist(playlist, tracks)];
    });
}); };
exports.replaceTracksInPlaylist = replaceTracksInPlaylist;
var createPlaylist = function (apiInstance, listName) { return __awaiter(void 0, void 0, void 0, function () {
    var body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getUser(apiInstance)];
            case 1:
                body = (_a.sent()).body;
                logger.info('attempting to create playlist');
                return [2 /*return*/, apiInstance.createPlaylist(body.id, listName)];
        }
    });
}); };
exports.createPlaylist = createPlaylist;
var getUserTracks = function (apiInstance, limit, offset) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        logger.info('attempting to get saved tracks');
        return [2 /*return*/, apiInstance.getMySavedTracks({ limit: limit, offset: offset })];
    });
}); };
exports.getUserTracks = getUserTracks;
var getTargetPlaylist = function (apiInstance) { return __awaiter(void 0, void 0, void 0, function () {
    var userPlaylists, playlistDetails, targetPlaylist, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger.info('attempting to get user playlists');
                return [4 /*yield*/, getUserPlaylists(apiInstance)];
            case 1:
                userPlaylists = _a.sent();
                playlistDetails = userPlaylists.body.items.map(function (_a) {
                    var id = _a.id, name = _a.name;
                    return ({ name: name, id: id });
                });
                targetPlaylist = playlistDetails.find(function (list) { return list.name === process.env.PLAYLIST_NAME; });
                if (!!targetPlaylist) return [3 /*break*/, 3];
                logger.info('attempting to create playlist');
                return [4 /*yield*/, createPlaylist(apiInstance, process.env.PLAYLIST_NAME)];
            case 2:
                body = (_a.sent()).body;
                targetPlaylist = body;
                _a.label = 3;
            case 3: return [2 /*return*/, targetPlaylist.id];
        }
    });
}); };
exports.getTargetPlaylist = getTargetPlaylist;
var getPublicLink = function (playlistId) { return "https://open.spotify.com/playlist/" + playlistId; };
exports.getPublicLink = getPublicLink;
var getNUserTracks = function (apiInstance, n) { return __awaiter(void 0, void 0, void 0, function () {
    var userTracks, i, step, body, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userTracks = [];
                i = 0;
                step = 50;
                _a.label = 1;
            case 1:
                if (!(userTracks.length < n)) return [3 /*break*/, 6];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, getUserTracks(apiInstance, step, i * step)];
            case 3:
                body = (_a.sent()).body;
                userTracks.push.apply(userTracks, body.items);
                i += 1;
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                return [2 /*return*/, { error: error_1 }];
            case 5: return [3 /*break*/, 1];
            case 6: return [2 /*return*/, { userTracks: userTracks }];
        }
    });
}); };
exports.getNUserTracks = getNUserTracks;
