import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const footer = style({
  backgroundColor: COLORS.gray[100],
  width: "100%",
  padding: "20px",
  borderTop: `1px solid ${COLORS.gray[200]}`,
});

export const footerContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const footerLogo = style({
  fontWeight: "bold",
  color: COLORS.gray[900],
});

export const footerLinks = style({
  display: "flex",
  gap: "6px",
  alignItems: "center",
  color: COLORS.gray[600],
});

export const footerLink = style({
  color: COLORS.gray[600],
  textDecoration: "none",

  ":hover": {
    textDecoration: "underline",
  },
});

export const footerDivider = style({
  width: "1px",
  height: "6px",
  backgroundColor: COLORS.gray[300],
});
