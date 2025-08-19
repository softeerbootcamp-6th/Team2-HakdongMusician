// 생년월일 포맷팅 함수
const formatBirthDate = (birthDate: string) => {
  return birthDate ? birthDate.replace(/-/g, ". ") : "-";
};

// 장기요양등급 포맷팅 함수
const formatCareGrade = (careLevel: number) => {
  if (careLevel === 6) return "인지지원";
  return careLevel ? `${careLevel}급` : "-";
};

// 성별 포맷팅 함수
const formatGender = (gender: string) => {
  return gender === "MALE" ? "남성" : "여성";
};
/*
 (DIRECTOR: 센터장, SOCIAL_WORKER: 사회복지사, CAREGIVER: 요양보호사)
*/
const formatStaffRole = (staffRole: string) => {
  switch (staffRole) {
    case "DIRECTOR":
      return "센터장";
    case "SOCIAL_WORKER":
      return "사회복지사";
    case "CAREGIVER":
      return "요양보호사";
    default:
      return "-";
  }
};

const colorByStaffRole = (staffRole: string) => {
  switch (staffRole) {
    case "DIRECTOR":
      return "yellow";
    case "SOCIAL_WORKER":
      return "green";
    case "CAREGIVER":
      return "blue";
    default:
      return "grayLight";
  }
};

export {
  formatBirthDate,
  formatCareGrade,
  formatGender,
  formatStaffRole,
  colorByStaffRole,
};
