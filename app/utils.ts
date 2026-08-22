export function isDateOverdue(date?: string): boolean {
  if (!date) {
    return false;
  }
  const parsedDate = parseDateDMY(date);
  if (!parsedDate) {
    return false;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  parsedDate.setHours(0, 0, 0, 0);
  return parsedDate < today;
}

export function parseDateDMY(value: string): Date | null {
  const [day, month, year] = value.split("-").map(Number);
  if (!day || !month || !year) {
    return null;
  }
  return new Date(year, month - 1, day);
}
