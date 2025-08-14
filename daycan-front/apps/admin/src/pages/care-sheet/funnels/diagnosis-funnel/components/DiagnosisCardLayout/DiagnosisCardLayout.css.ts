import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const diagnosisCardLayout = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "start",
  padding: "20px 10px",
  backgroundColor: COLORS.white,
  borderRadius: "16px",
  gap: "10px",
});
