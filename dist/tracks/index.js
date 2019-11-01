"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var byDuration = function (track1, track2) { return ((track1.duration < track2.duration) ? -1 : 1); };
var filterTrackData = function (tracks) { return (tracks.map(function (item) { return ({
    duration: item.track.duration_ms,
    id: item.track.id,
    name: item.track.name,
}); })); };
var getMeanTrackDuration = function (tracks) { return (Math.round(tracks.reduce(function (acc, curr) { return acc + curr.duration; }, 0) / tracks.length)); };
var getTrackByDuration = function (tracks, duration) {
    var closest = tracks.reduce(function (prev, curr) {
        return (Math.abs(curr.duration - duration) < Math.abs(prev.duration - duration) ? curr : prev);
    });
    return closest;
};
var getFixedDurationPlaylist = function (userTracks, playlistDuration) {
    var tracks = filterTrackData(userTracks);
    var numberOfTracks = Math.round(playlistDuration / getMeanTrackDuration(tracks));
    var playlist = [];
    var timeLeft = playlistDuration;
    for (var i = 0; i < numberOfTracks; i += 1) {
        var targetTrackDuration = Math.round(timeLeft / (numberOfTracks - i));
        var bestMatch = getTrackByDuration(tracks, targetTrackDuration);
        playlist.push("spotify:track:" + bestMatch.id);
        tracks.splice(tracks.indexOf(bestMatch), 1);
        timeLeft -= bestMatch.duration;
    }
    return playlist;
};
exports.getFixedDurationPlaylist = getFixedDurationPlaylist;
