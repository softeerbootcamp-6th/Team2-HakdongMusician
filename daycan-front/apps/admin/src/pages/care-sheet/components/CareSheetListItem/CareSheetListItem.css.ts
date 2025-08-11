import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const itemContainer = style({
  display: "grid !important",
  gridTemplateColumns: "24px 50px 100px 278px 96px 96px 100px 120px !important",
  gap: "16px",
  padding: "5px 10px",
  boxSizing: "border-box",
  borderBottom: `1px solid ${COLORS.gray[200]}`,
  alignItems: "center",
  transition: "all 0.2s ease",
  selectors: {
    "&:hover": {
      borderColor: COLORS.gray[300],
    },
    "&:last-child": {
      borderBottom: "none",
    },
  },
});

export const cell = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const itemProfileImage = style({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  objectFit: "cover",
});

export const itemStatusChip = style({
  padding: "4px 8px",
  borderRadius: "4px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

export const itemCheckboxWrapper = style({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
