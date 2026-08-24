export function isDateOverdue(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const taskDate = new Date(year, month - 1, day);
  taskDate.setHours(23, 59, 59, 999);
  const today = new Date();
  return taskDate < today;
}

export function parseDateDMY(value: string): Date | null {
  const [day, month, year] = value.split("-").map(Number);
  if (!day || !month || !year) {
    return null;
  }
  return new Date(year, month - 1, day);
}

export const handleScrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export function isInvalidTitle(title: string, minLength = 5) {
  return title.trim().length < minLength;
}
