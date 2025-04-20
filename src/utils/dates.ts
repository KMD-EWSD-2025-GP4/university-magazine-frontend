import { AcademicYearType } from "@/configs/schemas";
import { DateValue } from "@mantine/dates";
import dayjs from "dayjs";

const datetimeFormat = "YYYY-MM-DD hh:mm A";
const dateFormat = "YYYY-MM-DD";
const academicYearFormat = "MMM, YYYY";

// ISO Date -> DD/MM/YYYY, HH:mm AM/PM
export function formatDatetime(date: string | Date | null) {
  if (!date) return "";
  return dayjs(date).format(datetimeFormat);
}

export function formatDate(date: string | Date | null | undefined | DateValue) {
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

export function getCurrentAcademicYear(academicYears: AcademicYearType[]) {
  const currentDate = dayjs();
  return academicYears.find((year) =>
    currentDate.isBetween(year.startDate, year.endDate)
  );
}

export function getFullYear(date?: string | Date) {
  try {
    return dayjs(date).year();
  } catch {
    return date;
  }
}

export function formatAcademicYear(date?: string | Date) {
  return dayjs(date).format(academicYearFormat);
}
