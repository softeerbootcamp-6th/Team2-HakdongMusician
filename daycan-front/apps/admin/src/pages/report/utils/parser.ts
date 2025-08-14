import { COLORS } from "@daycan/ui";

export const getStatusInfo = (status: string) => {
  switch (status) {
    case "NOT_APPLICABLE":
      return {
        text: "검토 불가능",
        icon: "warningFilled",
        strokeColor: COLORS.white,
        color: COLORS.red[500],
      };
    case "PENDING":
      return {
        text: "리포트 생성 중..",
        strokeColor: COLORS.white,
        color: COLORS.yellow[500],
      };
    case "CREATED":
      return {
        text: "검토 가능",
        icon: "warningFilled",
        strokeColor: COLORS.white,
        color: COLORS.green[500],
      };
    case "REVIEWED":
      return {
        text: "검토 완료",
        icon: "circleCheck",
        strokeColor: COLORS.white,
        color: COLORS.blue[500],
      };
    case "SENDING":
      return {
        text: "전송 중",
        strokeColor: COLORS.white,
        color: COLORS.yellow[500],
      };
    case "RESERVED":
      return {
        text: "예약 완료",
        strokeColor: COLORS.white,
        color: COLORS.blue[500],
      };
    case "DONE":
      return {
        text: "전송 완료",
        strokeColor: COLORS.white,
        color: COLORS.green[500],
      };
    default:
      return {
        text: "알 수 없음",
        icon: "info",
        strokeColor: COLORS.white,
        color: COLORS.gray[600],
      };
  }
};

export const getButtonInfo = (status: string) => {
  switch (status) {
    case "CREATED":
      return {
        text: "검토 시작",
        variant: "primary" as const,
        style: undefined,
      };
    case "REVIEWED":
    case "DONE":
    case "RESERVED":
    case "SENDING":
      return {
        text: "검토 완료",
        variant: "unEmphasized" as const,
        style: { backgroundColor: COLORS.primary[200], color: COLORS.white },
      };

    default:
      return {
        text: "검토 불가능",
        variant: "unEmphasized" as const,
        style: undefined,
      };
  }
};

export const getGenderText = (gender: string) => {
  return gender === "FEMALE" ? "여" : "남";
};
