import { style } from "@vanilla-extract/css";

export const infoFunnelLayoutContainer = style({
  display: "flex",
  width: "100%",
  height: "100%",
  flexDirection: "column",
  gap: "10px",
  overflow: "auto",
  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  marginBottom: "80px",
});
