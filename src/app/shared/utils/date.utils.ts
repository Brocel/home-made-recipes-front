export function isoToDDMMYYYY(isoDate: string | null): string | null {
  if (!isoDate) return null;

  const parts = isoDate.split('-');
  if (parts.length !== 3) return null;

  const [year, month, day] = parts;
  return `${day}/${month}/${year}`;
}

export function ddmmyyyyToISO(date: string | null): string | null {
  if (!date) return null;

  const parts = date.split('/');
  if (parts.length !== 3) return null;

  const [day, month, year] = parts;
  return `${year}-${month}-${day}`;
}
