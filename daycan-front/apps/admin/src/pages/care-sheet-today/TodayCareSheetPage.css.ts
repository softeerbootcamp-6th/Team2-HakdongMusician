import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const todayCareSheetPageContainer = style({
  display: "flex",
  flexDirection: "column",
  backgroundColor: COLORS.gray[50],
  width: "100%",
  height: "100%",
  position: "relative",
});

export const todayCareSheetPageContentContainer = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  maxHeight: "100dvh",
  overflowY: "auto",
  paddingBottom: 100,
  boxSizing: "border-box",
  gap: 10,
});
