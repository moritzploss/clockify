const byDuration = (track1: Track, track2: Track): number => (
  (track1.duration < track2.duration) ? -1 : 1
);

const reduceTrackData = (tracks): Track[] => (
  tracks.map((item) => ({
    duration: item.track.duration_ms,
    id: item.track.id,
    name: item.track.name,
  }))
);

const getMeanTrackDuration = (tracks: Track[]): number => (
  Math.round(tracks.reduce((acc, curr) => acc + curr.duration, 0) / tracks.length)
);

const getTrackByDuration = (tracks: Track[], duration: number): Track => {
  const closest = tracks.reduce((prev, curr) => {
    return (Math.abs(curr.duration - duration) < Math.abs(prev.duration - duration) ? curr : prev);
  });
  return closest;
};

const getFixedDurationPlaylist = (userTracks, playlistDuration: number): string[] => {
  const trackList = reduceTrackData(userTracks);
  const numberOfTracks = Math.round(playlistDuration / getMeanTrackDuration(trackList)) || 1;

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
