import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const reportContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "1084px",
  boxSizing: "border-box",
});

export const reportButtons = style({
  display: "flex",
  flexDirection: "row",
  width: "380px",
  height: "56px",
  gap: 7,
});

export const reportFilter = style({
  marginTop: 12,
  display: "flex",
  flexDirection: "row",
  height: "32px",
  gap: 12,
});

export const reportFilterItem = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  justifySelf: "center",
  gap: 4,
  backgroundColor: COLORS.white,
  boxShadow: "0px 0px 4px 0px rgba(25, 28, 40, 0.25)",
  borderRadius: "8px",
  padding: "0 10px",
});

export const divider = style({
  width: "2px",
  height: "16px",
  backgroundColor: COLORS.gray[200],
});

export const reportFilterRefetchContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
