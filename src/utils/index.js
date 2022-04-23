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
  return datum;
}

export function timeSince(date) {
  date = new Date(date);
  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;
  let res;
  if (interval > 1) {
    interval = Math.floor(interval);
    res = interval + " year";
    if (interval !== 1) return res + "s";
    return res;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    interval = Math.floor(interval);
    res = interval + " month";
    if (interval !== 1) return res + "s";
    return res;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    interval = Math.floor(interval);
    res = interval + " day";
    if (interval !== 1) return res + "s";
    return res;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    interval = Math.floor(interval);
    res = interval + " hour";
    if (interval !== 1) return res + "s";
    return res;
  }
  interval = seconds / 60;
  if (interval > 1) {
    interval = Math.floor(interval);
    res = interval + " minute";
    if (interval !== 1) return res + "s";
    return res;
  }
  interval = Math.floor(interval);
  res = interval + " second";
  if (interval !== 1) return res + "s";
  return res;
}
export function convertTimestampToDate(timestamp) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let date = new Date(timestamp);

  return (
    months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
  );
}

const ACTION_TYPE_LOADING = "LOADING";
const ACTION_TYPE_SUCCESS = "SUCCESS";
const ACTION_TYPE_FAILURE = "FAILURE";

export { ACTION_TYPE_FAILURE, ACTION_TYPE_SUCCESS, ACTION_TYPE_LOADING };

export const NOT_AVAILABLE_IMAGE_URL =
  "https://booyah.live/ssr/_next/static/images/empty-vod-dark-mode.404178ec.png";

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
