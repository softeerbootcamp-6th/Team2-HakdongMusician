import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const staffListItemExpandedContainer = style({
  gridColumn: "1 / -1", // 전체 너비를 차지하도록 설정
  display: "block",
  width: "100%",
  backgroundColor: COLORS.gray[100],
  borderBottom: `1px solid ${COLORS.gray[200]}`,
});

export const staffListItemExpandedInfoContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  backgroundColor: COLORS.white,
  gap: "10px",
  paddingBottom: "14px",
});

export const rowDivider = style({
  width: "100%",
  height: "1px",
  backgroundColor: COLORS.gray[100],
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

export const staffListItemExpandedButtonContainer = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  marginLeft: "auto",
  gap: "8px",
  padding: "0px 25px",
});

export const staffListItemExpandedInfoHeader = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "8px",
  marginLeft: "20px",
  marginTop: "24px",
});

export const staffListItemExpandedInfoAvatar = style({
  width: "90px",
  height: "120px",
  objectFit: "cover",
  borderRadius: "9px",
});

export const staffListItemExpandedInfoContent = style({
  display: "flex",
  flexDirection: "row",
  gap: "20px",
});

export const staffListItemExpandedInfoContentDetail = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const staffInfoGrid = style({
  display: "grid",
  gridTemplateColumns: "90px 108px",
  columnGap: "16px",
  rowGap: "8px",
  alignItems: "center",
});
