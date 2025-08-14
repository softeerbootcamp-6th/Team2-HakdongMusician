import { style } from "@vanilla-extract/css";

export const diagnosisFunnelHeader = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
});

export const diagnosisFunnelTitle = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
});

export const diagnosisFunnelTitleStep = style({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  alignItems: "flex-end",
});
