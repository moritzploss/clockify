const hoursToMinutes = (hours: number): number => hours * 60;

const minutesToSeconds = (minutes: number): number => minutes * 60;

const userInputToMilliseconds = ({ hours, minutes, seconds }): number => {
  const secsFromSecs = Number(seconds);
  const secsFromMins = minutesToSeconds(Number(minutes));
  const secsFromHrs = minutesToSeconds(hoursToMinutes(Number(hours)));
  return (secsFromSecs + secsFromMins + secsFromHrs) * 1000;
};

export {
  userInputToMilliseconds,
};
