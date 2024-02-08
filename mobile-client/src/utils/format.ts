function shortDate(date: Date) {
  return date.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function dateTime(date: Date) {
  return date.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });
}

export default {
  shortDate,
  dateTime,
};
