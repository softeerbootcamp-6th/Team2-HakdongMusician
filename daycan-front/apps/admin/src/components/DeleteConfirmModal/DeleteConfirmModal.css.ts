import { style } from "@vanilla-extract/css";

export const deleteConfirmModalContainer = style({
  width: "700px",
  padding: "24px",
  height: "181px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const deleteConfirmModalTitle = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  marginBottom: "12px",
});

export const deleteConfirmModalContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  paddingTop: "10px",
});

export const deleteConfirmModalButton = style({
  display: "flex",
  gap: "8px",

  width: "330px",
  marginLeft: "auto",
});
