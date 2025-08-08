// 날짜 형식 변환
export const formatDate = (date: Date | undefined, isToday: boolean): string => {
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

  const { hour, minute } = timeData;
  return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
};
