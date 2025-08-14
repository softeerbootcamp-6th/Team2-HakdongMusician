import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const headerContainer = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: "16px",
  padding: "16px 24px",
  marginTop: "20px",
  backgroundColor: COLORS.gray[100],
  borderBottom: `1px solid ${COLORS.gray[200]}`,
  borderRadius: "8px",
  alignItems: "center",
});

export const cell = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  textAlign: "center",
  width: "100%",
});

export const headerCheckboxWrapper = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  padding: "4px",
  borderRadius: "4px",
  transition: "background-color 0.2s ease",

  selectors: {
    "&:hover": {
      backgroundColor: COLORS.gray[100],
    },
  },
});
