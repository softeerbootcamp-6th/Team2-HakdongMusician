import { style } from "@vanilla-extract/css";

export const memberDeleteConfirmModalContainer = style({
  width: "700px",
  height: "140px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const memberDeleteConfirmModalTitle = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  marginBottom: "12px",
});

export const memberDeleteConfirmModalContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  paddingTop: "10px",
});

export const memberDeleteConfirmModalButton = style({
  display: "flex",
  gap: "8px",

  width: "330px",
  marginLeft: "auto",
});
