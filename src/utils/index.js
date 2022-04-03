export function convertViewCount(viewCount) {
  return Math.abs(Number(viewCount)) >= 1.0e9
    ? (Math.abs(Number(viewCount)) / 1.0e9).toFixed(2) + "B"
    : Math.abs(Number(viewCount)) >= 1.0e6
    ? (Math.abs(Number(viewCount)) / 1.0e6).toFixed(2) + "M"
    : Math.abs(Number(viewCount)) >= 1.0e3
    ? (Math.abs(Number(viewCount)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(viewCount));
}

export function toTimestamp(strDate) {
  let datum = Date.parse(strDate);
  return datum / 1000;
}

export function timeSince(date) {
  let seconds = Math.floor(new Date(date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

const ACTION_TYPE_LOADING = "LOADING";
const ACTION_TYPE_SUCCESS = "SUCCESS";
const ACTION_TYPE_FAILURE = "FAILURE";

export { ACTION_TYPE_FAILURE, ACTION_TYPE_SUCCESS, ACTION_TYPE_LOADING };
