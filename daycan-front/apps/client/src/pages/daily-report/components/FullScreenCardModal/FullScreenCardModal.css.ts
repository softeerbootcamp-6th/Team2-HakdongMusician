import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const fullScreenCardModal = style({
  width: "90vw",
  maxWidth: "400px",
  margin: "auto",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: COLORS.white,
  overflow: "auto",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  position: "relative",
  padding: "12px 10px",
});
