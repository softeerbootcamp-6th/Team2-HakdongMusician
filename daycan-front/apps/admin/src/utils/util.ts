// 생년월일 포맷팅 함수
const formatBirthDate = (birthDate: string) => {
  return birthDate ? birthDate.replace(/-/g, ". ") : "-";
};

// 장기요양등급 포맷팅 함수
const formatCareGrade = (careLevel: number) => {
  return careLevel ? `${careLevel}급` : "-";
};

// 성별 포맷팅 함수
const formatGender = (gender: string) => {
  return gender === "MALE" ? "남성" : "여성";
};

export { formatBirthDate, formatCareGrade, formatGender };
