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
export function formatDate2(isoString) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  // Tháng trong JavaScript được đánh số từ 0 (January) đến 11 (December), nên cần cộng thêm 1.
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}