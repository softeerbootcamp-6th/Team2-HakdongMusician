import { style } from "@vanilla-extract/css";

export const memberEditModalContent = style({
  width: "700px",
  height: "100%",
});

export const memberEditModalForm = style({
  display: "flex",
  flexDirection: "column",
});

export const memberEditModalFormHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  marginBottom: "12px",
});

export const memberEditModalFormBody = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  boxSizing: "border-box",
  padding: "12px 0px",
  justifyContent: "center",
  alignItems: "center",
});

export const memberEditModalErrorMessage = style({
  display: "flex",
  width: "532px",
});

export const memberEditModalButton = style({
  display: "flex",
  justifyContent: "flex-end",
  padding: "10px 0px",
  gap: "10px",
  width: "370px",
  marginLeft: "auto",
});
