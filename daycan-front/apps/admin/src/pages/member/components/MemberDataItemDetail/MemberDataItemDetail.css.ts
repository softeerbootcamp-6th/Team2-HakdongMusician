import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const memberDataItemDetailContent = style({
  gridColumn: "1 / -1", // 전체 너비를 차지하도록 설정
  display: "block",
  width: "100%",
  borderBottom: `1px solid ${COLORS.gray[100]}`,
});

export const memberDataItemDetailContainer = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

export const memberDataItemDetailButtonContainer = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20px",
  borderRadius: "4px",
  gap: "148px",
  border: "none",
  width: "100%",
  height: "100%",
  minHeight: "250px",
  paddingRight: "25px",
});

export const memberDataItemDetailTopButton = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  width: "100%",
});

export const memberDataItemDetailBottomButton = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  marginLeft: "auto",
  paddingBottom: "14px",
  gap: "8px",
});

export const memberDataItemDetailCardContainer = style({
  flex: 4,
  paddingLeft: "20px",
  display: "flex",
  flexDirection: "row",
  gap: "32px",
});

export const editButton = style({
  backgroundColor: COLORS.green[500],
  color: COLORS.white,
  width: "58px",
  height: "32px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  ":hover": {
    backgroundColor: COLORS.green[200],
  },
});
