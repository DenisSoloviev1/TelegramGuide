//форматирует дату из формата 2025-01-26T14:48:26.816Z  в 26 января 2025
export const formatterDate = (date: string) => {
  const formattedDate = new Date(date)
    .toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .split("г")[0];

  return formattedDate;
};
