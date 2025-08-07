import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const careSheetPageContentButtonContainer = style({
  position: "fixed",
  left: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px 10px 30px 10px",
  width: "100%",

  backgroundColor: "rgba(255, 255, 255, 0.48)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  zIndex: 1000,
  boxSizing: "border-box",
  borderTop: `1px solid ${COLORS.gray[200]}`,
});
