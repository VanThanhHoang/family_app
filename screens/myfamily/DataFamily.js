// /Users/macm1/Code/FamilyApp/family/screens/myfamily/DataFamily.js

const createMember = (person, title) => ({
  people_id: person.people_id,
  full_name_vn: person.full_name_vn,
  profile_picture: person.profile_picture,
  birth_date: person.birth_date,
  gender: person.gender,
  phone_number: person.phone_number,
  marital_status: person.marital_status,
  is_alive: person.is_alive,
  saint: person.saint,
  religion: person.religion,
  education_level: person.education_level,  // Thêm trường education_level
  relationship: person.relationship,
  title: title,
});

export default createMember;
