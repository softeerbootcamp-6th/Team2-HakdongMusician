import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const reportEntryEditorContainer = style({
  marginBottom: "4px",
});

export const reportEntryEditorTitle = style({
  width: "100%",
  marginBottom: "16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const reportEntryItem = style({
  marginBottom: "16px",
  padding: "16px",
  border: `1px solid ${COLORS.gray[200]}`,
  borderRadius: "8px",

  backgroundColor: COLORS.white,
});

export const reportEntryField = style({
  marginBottom: "8px",
});

export const reportEntryFieldLabel = style({
  color: COLORS.gray[800],
  marginBottom: "8px",
});

export const reportEntryInput = style({
  width: "100%",
  marginTop: "8px",
  padding: "8px",
  fontSize: "14px",
  backgroundColor: COLORS.gray[50],
  boxSizing: "border-box",
  borderRadius: "8px",
  border: `1px solid ${COLORS.gray[200]}`,
  transition: "all 0.3s ease",
  cursor: "pointer",
  outline: "none",

  selectors: {
    "&[readonly]": {
      border: `1px dashed ${COLORS.red[500]}`,
      cursor: "not-allowed",
      backgroundColor: COLORS.gray[100],
      opacity: 0.8,
      transform: "scale(0.98)",
    },
  },
});

export const reportEntryInputHover = style({
  selectors: {
    "&:hover": {
      backgroundColor: COLORS.gray[100],
      borderColor: COLORS.gray[300],
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    "&:focus": {
      backgroundColor: COLORS.white,
      borderColor: COLORS.gray[400],
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
      outline: "none",
    },
    "&:active": {
      transform: "translateY(0px)",
      transition: "all 0.1s ease",
    },
  },
});

export const reportEntryTextarea = style({
  width: "100%",
  padding: "12px",
  boxSizing: "border-box",
  border: `1px solid ${COLORS.gray[200]}`,
  borderRadius: "8px",
  minHeight: "80px",
  fontSize: "14px",
  resize: "vertical",
  backgroundColor: COLORS.white,
});

export const reportEntryMemoContainer = style({
  marginBottom: "16px",
});
