import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const datetimeFormat = "DD/MM/YYYY, h:mm A";
const dateFormat = "MMM DD, YYYY"; // April 12, 2023

// ISO Date -> DD/MM/YYYY, HH:mm AM/PM
export function formatServerDatetime(date: string) {
  return dayjs(date).format(datetimeFormat);
}

export function formatDate(date: string | Date) {
  return dayjs(date).format(dateFormat);
}

export function formatRelativeTime(date: string) {
  return dayjs(date).fromNow();
}
