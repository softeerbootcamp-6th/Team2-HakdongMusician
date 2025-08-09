import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const programRow = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginBottom: 8,
});

export const nameInput = style({
  flex: 1,
  width: "120px",
  padding: "8px",
  boxSizing: "border-box",
  border: `1px solid ${COLORS.gray[200]}`,
  borderRadius: 8,
});

export const dropdown = style({
  position: "relative",
});

export const dropdownMenu = style({
  position: "absolute",
  top: 40,
  left: 0,
  width: 90,
  background: COLORS.white,
  border: `1px solid ${COLORS.gray[200]}`,
  borderRadius: 8,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  zIndex: 20,
});

export const dropdownItem = style({
  padding: "8px 12px",
  width: 90,
  cursor: "pointer",
  selectors: {
    "&:hover": {
      background: COLORS.gray[50],
    },
  },
});

export const addRowContainer = style({
  display: "flex",
  justifyContent: "flex-end",
});

export const iconButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 28,
  height: 28,
  background: COLORS.gray[100],
  borderRadius: 8,
  border: `1px solid ${COLORS.gray[200]}`,
  cursor: "pointer",
});
