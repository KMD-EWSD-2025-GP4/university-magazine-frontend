import { DateValue } from "@mantine/dates";
import dayjs from "dayjs";

const datetimeFormat = "DD/MM/YYYY, h:mm A";
const dateFormat = "MMM DD, YYYY";

// ISO Date -> DD/MM/YYYY, HH:mm AM/PM
export function formatDatetime(date: string | Date | null) {
  if (!date) return "";
  return dayjs(date).format(datetimeFormat);
}

export function formatDate(date: string | Date | null | DateValue) {
  if (!date) return "";
  return dayjs(date).format(dateFormat);
}

export function formatRelativeTime(date: string) {
  return dayjs(date).fromNow();
}

export function getEndOfDay(date: string | Date | null) {
  if (!date) return "";
  return dayjs(date).endOf("day").format();
}

export function getStartOfDay(date: string | Date | null) {
  if (!date) return "";
  return dayjs(date).startOf("day").format();
}
