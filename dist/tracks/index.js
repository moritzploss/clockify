"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reduceTrackData = function (tracks) { return (tracks.map(function (item) { return ({
    duration: item.track.duration_ms,
    id: item.track.id,
    name: item.track.name,
}); })); };
var getMeanTrackDuration = function (tracks) { return (Math.round(tracks.reduce(function (acc, curr) { return acc + curr.duration; }, 0) / tracks.length)); };
var getTrackByDuration = function (tracks, duration) { return (tracks.reduce(function (prev, curr) { return ((Math.abs(curr.duration - duration) < Math.abs(prev.duration - duration) ? curr : prev)); })); };
var getFixedDurationPlaylist = function (userTracks, playlistDuration) {
    var trackList = reduceTrackData(userTracks);
    var numberOfTracks = Math.round(playlistDuration / getMeanTrackDuration(trackList)) || 1;
    var playlist = [];
    var timeLeft = playlistDuration;
    for (var i = 0; i < numberOfTracks; i += 1) {
        var targetTrackDuration = Math.round(timeLeft / (numberOfTracks - i));
        var bestMatch = getTrackByDuration(trackList, targetTrackDuration);
        playlist.push("spotify:track:" + bestMatch.id);
        trackList.splice(trackList.indexOf(bestMatch), 1);
        timeLeft -= bestMatch.duration;
    }
    return playlist;
};
exports.default = getFixedDurationPlaylist;
