import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const reportsPageContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
  width: "100%",
  minHeight: "100dvh",
  overflow: "auto",
  boxSizing: "border-box",
  padding: "20px 5px",
  backgroundColor: COLORS.gray[50],
});

