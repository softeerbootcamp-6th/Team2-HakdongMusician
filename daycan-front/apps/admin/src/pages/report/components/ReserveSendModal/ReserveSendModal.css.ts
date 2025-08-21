import { style } from "@vanilla-extract/css";

export const reserveSendModalContainer = style({
  display: "flex",
  flexDirection: "column",

  padding: "32px",
  width: "716px",
  height: "261px",
});

export const reserveSendModalButtonContainer = style({
  display: "flex",
  gap: "12px",
  justifyContent: "flex-end",
});

export const timeSelectionContainer = style({
  display: "flex",
  justifyContent: "center",
  margin: "16px 0",
});

export const timeSelectGroup = style({
  display: "flex",
  gap: "12px",
  alignItems: "center",
});
