import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const memberContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "1084px",
  boxSizing: "border-box",
});

export const memberFilterContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

export const memberSearch = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

export const memberFilter = style({
  display: "flex",
  flexDirection: "row",

  alignItems: "center",
  gap: "8px",
  minWidth: "132px",
  height: "32px",
});

export const memberButton = style({
  width: "184px",
});

export const resetContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  backgroundColor: COLORS.white,
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#E0E0E0",
  },
  boxShadow: `0px 0px 4px rgba(0, 0, 0, 0.05)`,
});

export const divider = style({
  width: "2px",
  height: "16px",
  backgroundColor: COLORS.gray[200],
  margin: "0 12px",
});

export const memberListContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  gap: "8px",
  boxSizing: "border-box",
});
