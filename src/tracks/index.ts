const byDuration = (track1, track2) => (
  (track1.duration < track2.duration) ? -1 : 1
);

const reduceTrackData = (tracks) => (
  tracks.map((item) => ({
    duration: item.track.duration_ms,
    id: item.track.id,
    name: item.track.name,
  }))
);

const getMeanTrackDuration = (tracks) => (
  Math.round(tracks.reduce((acc, curr) => acc + curr.duration, 0) / tracks.length)
);

const getTrackByDuration = (tracks, duration: number) => {
  const closest = tracks.reduce((prev, curr) => {
    return (Math.abs(curr.duration - duration) < Math.abs(prev.duration - duration) ? curr : prev);
  });
  return closest;
};

const getFixedDurationPlaylist = (userTracks, playlistDuration: number) => {
  const trackList = reduceTrackData(userTracks);
  const numberOfTracks = Math.round(playlistDuration / getMeanTrackDuration(trackList));

  const playlist = [];
  let timeLeft = playlistDuration;

  for (let i = 0; i < numberOfTracks; i += 1) {
    const targetTrackDuration = Math.round(timeLeft / (numberOfTracks - i));
    const bestMatch = getTrackByDuration(trackList, targetTrackDuration);
    playlist.push(`spotify:track:${bestMatch.id}`);
    trackList.splice(trackList.indexOf(bestMatch), 1);
    timeLeft -= bestMatch.duration;
  }

  return playlist;
};

export {
  getFixedDurationPlaylist
};
