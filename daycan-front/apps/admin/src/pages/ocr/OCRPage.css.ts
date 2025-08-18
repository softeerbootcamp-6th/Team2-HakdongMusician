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
  left: 0,
  bottom: 0,
  width: "100%",
  padding: "20px 10px 30px 10px",
});
