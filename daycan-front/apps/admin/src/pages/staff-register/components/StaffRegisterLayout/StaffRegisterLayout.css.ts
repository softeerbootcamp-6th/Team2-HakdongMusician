import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const staffRegisterLayoutContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: 58,
  backgroundColor: COLORS.gray[50],
  width: "1084px",
  minHeight: "100vh",
  marginTop: "60px",
});

export const staffRegisterLayoutHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const staffRegisterLayoutHeaderTitle = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const staffRegisterLayoutHeaderDescription = style({
  paddingLeft: "4px",
  backgroundColor: COLORS.white,
  height: "77px",
  borderRadius: 8,
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "24px 10px",
});

export const staffRegisterLayoutContent = style({
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

export const staffRegisterPageButtonContainer = style({
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: 100,
});
