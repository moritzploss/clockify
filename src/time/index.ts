const hoursToMinutes = (hours) => hours * 60;

const minutesToSeconds = (minutes) => minutes * 60;

const userInputToMilliseconds = ({ hours, minutes, seconds }) => {
  const secsFromSecs = Number(seconds);
  const secsFromMins = minutesToSeconds(Number(minutes));
  const secsFromHrs = minutesToSeconds(hoursToMinutes(Number(hours)));
  return (secsFromSecs + secsFromMins + secsFromHrs) * 1000;
};

export {
  userInputToMilliseconds,
};
