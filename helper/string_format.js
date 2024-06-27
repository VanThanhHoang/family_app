export const dateFormater = (date) => {
  if (!date) return "Chưa rõ";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};
