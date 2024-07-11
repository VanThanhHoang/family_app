const defaultInfo = {
  email: "",
  full_name_vn: "",
  birth_date: "",
  phone_number: "",
  nationality: "Việt Nam",
  marital_status: false, // false là độc thân, true là đã kết hôn
  history: "",
  status: ["employed"], // mặc định là "Đi Làm"
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
  religion: ["catholic"], // mặc định là "Công giáo"
  achievement: "",
  relationship_category: ["ex_girlfriend"], // mặc định là "Bạn"
  address: {
    country: "",
    postal_code: "",
    city: "",
    state_or_province: "",
    district_or_county: "",
    address_line: "",
  },
  place_of_birth: {
    country: "",
    postal_code: "",
    city: "",
    state_or_province: "",
    district_or_county: "",
    address_line: "",
  },
  place_of_death: {
    country: "",
    postal_code: "",
    city: "",
    state_or_province: "",
    district_or_county: "",
    address_line: "",
  },
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


export { defaultInfo, validateForm };
