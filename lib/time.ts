// Day keys ("YYYY-MM-DD") are calendar dates in the user's own time zone.
// Workout logs store them as midnight UTC of that date so they can be matched exactly.
export function localDateString(timeZone: string, now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

export function dayToDbDate(day: string): Date {
  return new Date(`${day}T00:00:00.000Z`);
}

export function dbDateToDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}