import dayjs from "dayjs";

const datetimeFormat = "DD/MM/YYYY, h:mm A";

// ISO Date -> DD/MM/YYYY, HH:mm AM/PM
export function formatServerDatetime(date: string) {
  return dayjs(date).format(datetimeFormat);
}
