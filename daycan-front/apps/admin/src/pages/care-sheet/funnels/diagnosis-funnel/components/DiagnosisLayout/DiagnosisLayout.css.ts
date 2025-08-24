import { style } from "@vanilla-extract/css";

export const diagnosisFunnelLayout = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "10px",
  paddingBottom: "100px",
  overflowY: "auto",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "::-webkit-scrollbar": {
    display: "none",
  },
});
