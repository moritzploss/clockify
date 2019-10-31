const byDuration = (track1, track2) => (
  (track1.duration < track2.duration) ? -1 : 1
);

const filterTrackData = (tracks) => (
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

const getNewTracks = (userTracks, targetDuration: number) => {
  const sortedTracks = filterTrackData(userTracks).sort(byDuration);
  let targetLength = getMeanTrackDuration(sortedTracks);
  const numberOfTracks = Math.round(targetDuration / targetLength);

  const tracksToAdd = [];
  let i = 0;
  let timeLeft = targetDuration;
  while (i <= numberOfTracks) {
    targetLength = Math.round(timeLeft / (numberOfTracks - i));
    const closest = getTrackByDuration(sortedTracks, targetLength);
    tracksToAdd.push(`spotify:track:${closest.id}`);
    sortedTracks.splice(sortedTracks.indexOf(closest), 1);
    timeLeft -= closest.duration;
    i += 1;
  }
  return tracksToAdd;
};

export {
  getNewTracks
};
