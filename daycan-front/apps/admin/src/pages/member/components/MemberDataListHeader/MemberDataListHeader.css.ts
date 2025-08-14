import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const memberDataListHeader = style({
  display: "flex",
  flexDirection: "row",
  backgroundColor: COLORS.gray[100],
  borderRadius: "8px",
  border: `1px solid ${COLORS.gray[200]}`,
  width: "100%",
  height: "43px",
  alignItems: "center",
  boxSizing: "border-box",
});

export const memberDataListHeaderContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "23px",
  paddingRight: "16px",
});

// 공통 헤더 텍스트 스타일
export const headerTextStyle = style({
  textAlign: "center",
  color: COLORS.gray[600],
});

// 각 컬럼별 스타일
export const orderColumn = style({
  width: "80px",
  textAlign: "center",
  color: COLORS.gray[600],
});

export const profileColumn = style({
  width: "60px",
  textAlign: "center",
  color: COLORS.gray[600],
});

export const nameColumn = style({
  width: "120px",
  textAlign: "center",
  color: COLORS.gray[600],
});

export const birthDateColumn = style({
  width: "120px",
  textAlign: "center",
  color: COLORS.gray[600],
});

export const genderColumn = style({
  width: "80px",
  textAlign: "center",
  color: COLORS.gray[600],
});

export const careGradeColumn = style({
  width: "100px",
  textAlign: "center",
  color: COLORS.gray[600],
});

export const careNumberColumn = style({
  width: "150px",
  textAlign: "center",
  color: COLORS.gray[600],
});

export const guardianContactColumn = style({
  width: "130px",
  textAlign: "center",
  color: COLORS.gray[600],
});

export const detailButton = style({
  backgroundColor: "transparent",
  width: "70px",
  cursor: "default",
});
