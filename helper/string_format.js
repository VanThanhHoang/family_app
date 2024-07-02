export const dateFormater = (date) => {
  if (!date) return "Chưa rõ";
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

export const removeDiacritics = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};