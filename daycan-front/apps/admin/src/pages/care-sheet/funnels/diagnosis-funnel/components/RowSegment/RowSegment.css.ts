import { style } from "@vanilla-extract/css";

export const rowSegmentContainer = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  boxSizing: "border-box",
  padding: "4px",
  width: "100%",
});

export const rowSegmentLabelContainer = style({
  flex: 2,
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  alignItems: "center",
});

export const rowSegmentSegmentContainer = style({
  flex: 3,
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  alignItems: "center",
});
