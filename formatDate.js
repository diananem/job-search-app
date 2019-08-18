export const formatDate = date => {
  let s = (+new Date() - Date.parse(date)) / 1e3;
  let m = s / 60;
  let h = m / 60;
  let d = h / 24;
  let y = d / 365.242199;
  let tmp;
  const isEqual = num => (tmp = Math.round(num)) === 1;
  const isBigger = num => num < 1.01;

  return isEqual(s)
    ? "just now"
    : isBigger(m)
    ? tmp + " seconds ago"
    : isEqual(m)
    ? "a minute ago"
    : isBigger(h)
    ? tmp + " minutes ago"
    : isEqual(h)
    ? "an hour ago"
    : isBigger(d)
    ? tmp + " hours ago"
    : isEqual(d)
    ? "yesterday"
    : isBigger(y)
    ? tmp + " days ago"
    : isEqual(y)
    ? "a year ago"
    : tmp + " years ago";
};
