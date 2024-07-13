const defaultInfo = {
  email: "",
  full_name_vn: "",
  birth_date: "",
  phone_number: "",
  nationality: "Việt Nam",
  marital_status: false, // false là độc thân, true là đã kết hôn
  history: "",
  status: "employed", // mặc định là "Đi Làm"
  gender: true, // true là nam, false là nữ
  is_alive: true, // true là còn sống, false là đã mất
  education_level: "",
  occupation: "",
  monk_notes: "",
  unemployed_notes: "",
  death_date: "",
  wedding_day: "",
  hobbies_interests: "",
  social_media_links: "",
  cause_of_death: "",
  religion: "catholic", // mặc định là "Công giáo"
  achievement: "",
  relationship_category: "classmate", // mặc định là "Bạn"
  address: null,
  place_of_birth: null,
  place_of_death:null,
};
const validateForm = (data) => {
  let errors = [];

  if (!data.full_name_vn.trim()) {
    errors.push("Họ và tên không được để trống");
  }

  if (!data.email.trim()) {
    errors.push("Email không được để trống");
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.push("Email không hợp lệ");
  }

  if (!data.phone_number.trim()) {
    errors.push("Số điện thoại không được để trống");
  } else if (!/^[0-9]{10}$/.test(data.phone_number)) {
    errors.push("Số điện thoại không hợp lệ");
  }
  // check birth_date
  if (!data.birth_date.trim()) {
    errors.push("Ngày sinh không được để trống");
  } else {
    const birthDate = new Date(data.birth_date);
    if (isNaN(birthDate.getTime())) {
      errors.push("Ngày sinh không hợp lệ");
    }
  }
  return errors;
};
export const RELIGION_CHOICES = [
  { label: "Công giáo", value: "catholic" },
  { label: "Phật giáo", value: "buddhist" },
  { label: "Tin Lành", value: "protestant" },
  { label: "Đạo khác", value: "other" },
];

export const STATUS_CHOICES = [
  { label: "Đang đi học", value: "student" },
  { label: "Đã đi làm", value: "employed" },
  { label: "Thất nghiệp", value: "unemployed" },
  { label: "Đi tu", value: "monk" },
];

export const RELATIONSHIP_CATEGORY_CHOICES = [
  { label: "Ân Nhân", value: "benefactor" },
  { label: "Teacher", value: "teacher" },
  { label: "Bạn gái cũ", value: "ex_girlfriend" },
  { label: "Bạn học", value: "classmate" },
];
export const formInputs = [
  { title: "Họ và tên", key: "full_name_vn" },
  { title: "Email", key: "email" },
  {
    title: "Ngày tháng năm sinh (yyyy-mm-dd)",
    key: "birth_date",
    isDate: true,
    onChangeDate: (date) =>
      setFormData({ ...formData, birth_date: formatDate2(date) }),
  },
  { title: "Số điện thoại", key: "phone_number" },
  { title: "Quốc tịch", key: "nationality" },
  { title: "Tiểu sử", key: "history" },
];

export const additionalFormInputs = [
  { title: "Trình độ học vấn", key: "education_level" },
  { title: "Ghi chú tu hành", key: "monk_notes" },
  { title: "Nghề nghiệp", key: "occupation" },
  { title: "Liên kết mạng xã hội", key: "social_media_links" },
];
export { defaultInfo, validateForm };
