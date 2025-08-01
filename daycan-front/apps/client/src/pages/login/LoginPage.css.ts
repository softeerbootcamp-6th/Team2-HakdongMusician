import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const container = style({
  display: "flex",
  height: "100dvh",
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  boxSizing: "border-box",
  backgroundColor: COLORS.white,
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "40px",
});

export const formContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "320px",
  gap: "16px",
});

export const inputGroup = style({
  position: "relative",
});

export const customInput = style({
  width: "100%",
  boxSizing: "border-box",
  padding: "16px",
  borderRadius: "8px",
  backgroundColor: COLORS.gray[50],
  color: COLORS.gray[900],
  outline: "none",
  transition: "border-color 0.2s ease",

  ":focus": {
    borderColor: COLORS.blue[500],
  },

  "::placeholder": {
    color: COLORS.gray[500],
  },
});

export const optionsContainer = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "16px",
  color: COLORS.gray[600],
});

export const checkboxContainer = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  position: "relative",
});

export const forgotPassword = style({
  color: COLORS.gray[600],
  textDecoration: "none",
  position: "relative",
});

export const footer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",

  position: "absolute",
  bottom: "70px",
  left: "0",
  right: "0",
});

export const footerLink = style({
  color: COLORS.gray[800],
  textDecoration: "underline",
  position: "relative",
});
