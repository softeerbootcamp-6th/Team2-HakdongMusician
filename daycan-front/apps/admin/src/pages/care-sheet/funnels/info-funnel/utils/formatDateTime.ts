// 날짜 형식 변환
export const formatDate = (
  date: Date | undefined,
  isToday: boolean
): string => {
  if (isToday) {
    return new Date().toISOString().split("T")[0]; // "2025-08-01" 형식
  }
  if (date) {
    return date.toISOString().split("T")[0];
  }
  return new Date().toISOString().split("T")[0]; // 기본값
};

// 시간 형식 변환 (TimePicker에서 받은 데이터를 "HH:MM" 형식으로)
export const formatTime = (timeData: any): string => {
  if (!timeData) return "09:00"; // 기본값

  const { hour, minute, amPm } = timeData;
  // 12시간 → 24시간 변환
  if (amPm) {
    const hNum = Number(hour || 9);
    const to24 = amPm === "오전" ? hNum % 12 : (hNum % 12) + 12;
    return `${String(to24).padStart(2, "0")}:${String(minute || "00").padStart(2, "0")}`;
  }
  // 이미 24시간 형태면 그대로 포맷만 보정
  return `${String(hour || "09").padStart(2, "0")}:${String(minute || "00").padStart(2, "0")}`;
};
