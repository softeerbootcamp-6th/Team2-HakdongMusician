import { style } from "@vanilla-extract/css";

export const editAuthModalContent = style({
  width: "700px",
  padding: "24px",
  height: "100%",
});

export const editAuthModalForm = style({
  display: "flex",
  flexDirection: "column",
});

export const editAuthModalFormHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  marginBottom: "12px",
});

export const editAuthModalFormBody = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  boxSizing: "border-box",
  padding: "12px 0px",
  justifyContent: "center",
  alignItems: "center",
});

export const editAuthModalErrorMessage = style({
  display: "flex",
  width: "532px",
});

export const editAuthModalButton = style({
  display: "flex",
  justifyContent: "flex-end",
  padding: "10px 0px",
  gap: "10px",
  width: "370px",
  marginLeft: "auto",
});
