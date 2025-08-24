import { COLORS } from "@daycan/ui";

export const getStatusInfo = (status: string) => {
  switch (status) {
    case "PENDING":
      return {
        text: "작성 필요",
        icon: "warningFilled",
        color: COLORS.yellow[500],
      };
    case "DONE":
      return {
        text: "작성 완료",
        icon: "circleCheck",
        color: COLORS.green[500],
        strokeColor: COLORS.white,
      };
    case "NOT_APPLICABLE":
      return {
        text: "작성 불가",
        icon: "warningFilled",
        color: COLORS.red[500],
      };
    case "REVIEWED":
      return {
        text: "검토 완료",
        icon: "circleCheck",
        color: COLORS.blue[500],
        strokeColor: COLORS.white,
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
