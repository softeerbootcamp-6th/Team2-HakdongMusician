import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const memberDataItemDetailContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "1084px",
  boxSizing: "border-box",
  borderTop: `1px solid ${COLORS.gray[200]}`,
});

export const memberDataItemDetailContent = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  paddingLeft: "33px",
  paddingRight: "16px",
  paddingTop: "16px",
  paddingBottom: "24px",
  borderRadius: "0 0 8px 8px",
  backgroundColor: "#FFFFFF",
  boxShadow: `0px 0px 4px rgba(0, 0, 0, 0.05)`,
});

export const memberDataItemDetailButtonContainer = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 16px",
  borderRadius: "4px",
  border: "none",
  width: "100%",
  height: "100%",
  minHeight: "250px",
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
  gap: "8px",
});

export const memberDataItemDetailCardContainer = style({
  flex: 4,
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
