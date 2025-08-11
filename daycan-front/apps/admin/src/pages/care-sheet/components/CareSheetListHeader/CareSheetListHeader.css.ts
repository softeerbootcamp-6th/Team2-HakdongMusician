import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const headerContainer = style({
  marginTop: "10px",
  display: "grid !important",
  gridTemplateColumns: "24px 50px 100px 278px 96px 96px 100px 120px !important",
  gap: "16px",
  padding: "16px 26px",
  backgroundColor: COLORS.gray[100],
  borderRadius: "8px",
  border: `1px solid ${COLORS.gray[200]}`,
});

export const cell = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const headerCheckboxWrapper = style({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
