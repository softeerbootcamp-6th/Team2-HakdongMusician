// 헤더 컬럼 정의
export const ELDER_HEADERS = [
  { key: "order", text: "순서", width: "60px" },
  { key: "profileImage", text: "프로필", width: "80px" },
  { key: "name", text: "이름", width: "120px" },
  { key: "birthDate", text: "생년월일", width: "120px" },
  { key: "gender", text: "성별", width: "80px" },
  { key: "careGrade", text: "장기요양등급", width: "120px" },
  { key: "careNumber", text: "장기요양인정번호", width: "150px" },
  { key: "guardianContact", text: "보호자연락처", width: "140px" },
];

// 데이터 컬럼 정의 (헤더와 순서 동일하게)
export const ELDER_COLUMNS = [
  { key: "order", field: "order", width: "60px" },
  { key: "profileImage", field: "profileImage", width: "80px" },
  { key: "name", field: "name", width: "120px" },
  { key: "birthDate", field: "birthDate", width: "120px" },
  { key: "gender", field: "gender", width: "80px" },
  { key: "careGrade", field: "careGrade", width: "120px" },
  { key: "careNumber", field: "careNumber", width: "150px" },
  { key: "guardianContact", field: "guardianContact", width: "140px" },
];
