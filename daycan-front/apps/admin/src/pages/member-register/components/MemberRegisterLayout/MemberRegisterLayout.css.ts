import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const memberRegisterLayoutContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: 58,
  backgroundColor: COLORS.gray[50],
  width: "1084px",
  minHeight: "100vh",
  marginTop: "60px",
});

export const memberRegisterLayoutHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const memberRegisterLayoutHeaderTitle = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const memberRegisterLayoutHeaderDescription = style({
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

export const memberRegisterLayoutContent = style({
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

export const memberRegisterPageButtonContainer = style({
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: 100,
});
