import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});

export const mobileHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: COLORS.gray[50],
  width: "100%",
  height: "64px",
  padding: "12px 16px",
  boxSizing: "border-box",
  "@media": {
    "screen and (min-width: 768px)": {
      display: "none",
    },
  },
});

export const contentWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});
