import type { AgeRange } from "../types/institution";

export function formatAgeRange(ageRange: AgeRange): string {
  const fromYears = ageRange.LowerAgeLimitYears;
  const fromMonths = ageRange.LowerAgeLimitMonths;
  const toYears = ageRange.UpperAgeLimitYears;
  const toMonths = ageRange.UpperAgeLimitMonths;

  const fromStr =
    fromYears > 0
      ? `${fromYears}г.${fromMonths > 0 ? ` ${fromMonths}м.` : ""}`
      : `${fromMonths}м.`;

  const toStr =
    toYears > 0
      ? `${toYears}г.${toMonths > 0 ? ` ${toMonths}м.` : ""}`
      : `${toMonths}м.`;

  return `${fromStr} - ${toStr}`;
}

export function formatVacancies(capacity: number, vacancies: number): string {
  return `${vacancies}/${capacity}`;
}

export function formatDate(dateString: string): string {
  if (!dateString || dateString === "0001-01-01T00:00:00") return "—";
  return new Date(dateString).toLocaleDateString("ru-RU");
}
