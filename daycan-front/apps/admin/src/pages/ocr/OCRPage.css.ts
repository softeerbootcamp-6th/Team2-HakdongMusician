import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const ocrPageContainer = style({
  display: "flex",
  flexDirection: "column",
  backgroundColor: COLORS.gray[50],
  width: "100%",
  height: "100%",
  position: "relative",
});

export const ocrPageContentContainer = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  marginTop: 25,
});

export const ocrPageButtonContainer = style({
  position: "fixed",
  bottom: 0,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px 10px 30px 10px",
  width: "100%",
  maxWidth: "450px",
  backgroundColor: "rgba(255, 255, 255, 0.48)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  zIndex: 1000,
  boxSizing: "border-box",
  borderTop: `1px solid ${COLORS.gray[200]}`,
});
