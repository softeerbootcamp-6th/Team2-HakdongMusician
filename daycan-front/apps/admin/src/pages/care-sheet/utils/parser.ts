import { COLORS } from "@daycan/ui";

export const getStatusInfo = (status: string) => {
  switch (status) {
    case "SHEET_PENDING":
      return {
        text: "작성 필요",
        icon: "warningFilled",
        color: COLORS.yellow[500],
      };
    case "SHEET_DONE":
      return {
        text: "작성 완료",
        icon: "circleCheck",
        color: COLORS.blue[500],
        strokeColor: COLORS.white,
      };
    case "NOT_APPLICABLE":
      return {
        text: "작성 불가",
        icon: "info",
        color: COLORS.gray[600],
      };
    default:
      return {
        text: "예외 처리",
        icon: "info",
        color: COLORS.gray[600],
      };
  }
};

export const getGenderText = (gender: string) => {
  return gender === "FEMALE" ? "여" : "남";
};
