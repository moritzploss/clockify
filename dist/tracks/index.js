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
var getFixedDurationPlaylist = function (userTracks, targetDuration) {
    var sortedTracks = filterTrackData(userTracks).sort(byDuration);
    var targetLength = getMeanTrackDuration(sortedTracks);
    var numberOfTracks = Math.round(targetDuration / targetLength);
    var tracksToAdd = [];
    var i = 0;
    var timeLeft = targetDuration;
    while (i < numberOfTracks) {
        targetLength = Math.round(timeLeft / (numberOfTracks - i));
        var closest = getTrackByDuration(sortedTracks, targetLength);
        tracksToAdd.push("spotify:track:" + closest.id);
        sortedTracks.splice(sortedTracks.indexOf(closest), 1);
        timeLeft -= closest.duration;
        i += 1;
    }
    return tracksToAdd;
};
exports.getFixedDurationPlaylist = getFixedDurationPlaylist;
