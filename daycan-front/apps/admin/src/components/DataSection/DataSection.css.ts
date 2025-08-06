import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const dataSectionContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "1084px",
  boxSizing: "border-box",
  borderTop: `1px solid ${COLORS.gray[200]}`,
});

export const dataSectionContent = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  padding: "24px",
  borderRadius: "8px",
  backgroundColor: "#FFFFFF",
  boxShadow: `0px 0px 4px rgba(0, 0, 0, 0.05)`,
});

export const dataSectionButtonContainer = style({
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

export const dataSectionTopButton = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  width: "100%",
});

export const dataSectionBottomButton = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  marginLeft: "auto",
  gap: "8px",
});
