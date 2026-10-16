const monthIndex: Record<string, number> = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

const startOfToday = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
};

export const parseTrekDate = (value: string) => {
  const [day, month, year] = value.trim().split(" ");
  const monthNumber = monthIndex[month];
  const dayNumber = Number(day);
  const yearNumber = Number(year);

  if (!Number.isFinite(dayNumber) || monthNumber === undefined || !Number.isFinite(yearNumber)) return null;
  return new Date(yearNumber, monthNumber, dayNumber);
};

export const isTrekDatePast = (value: string) => {
  const date = parseTrekDate(value);
  return date ? date.getTime() < startOfToday().getTime() : false;
};

export const sortByUpcomingDate = <T extends { date: string }>(items: T[]) => {
  const today = startOfToday();

  return [...items].sort((first, second) => {
    const firstDate = parseTrekDate(first.date)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    const secondDate = parseTrekDate(second.date)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    const firstIsPast = firstDate < today.getTime();
    const secondIsPast = secondDate < today.getTime();

    if (firstIsPast !== secondIsPast) return firstIsPast ? 1 : -1;
    return firstIsPast ? secondDate - firstDate : firstDate - secondDate;
  });
};

export const sortDateStringUpcomingFirst = <T extends { dateStr: string }>(items: T[]) =>
  sortByUpcomingDate(items.map((item) => ({ ...item, date: item.dateStr }))).map(({ date: _date, ...item }) => item as T);

export const getCurrentTrekSeason = () => {
  const month = new Date().getMonth();

  if (month >= 5 && month <= 8) return "monsoon" as const;
  if (month >= 9 || month === 0) return "winter" as const;
  return "summer" as const;
};
