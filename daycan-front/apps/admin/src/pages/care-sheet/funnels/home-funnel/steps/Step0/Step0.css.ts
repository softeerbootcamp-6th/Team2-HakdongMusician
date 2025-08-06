import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const careSheetPageContainer = style({
  display: "flex",
  flexDirection: "column",
  backgroundColor: COLORS.gray[50],
  width: "100%",
  height: "100%",
  position: "relative",
});

export const careSheetPageContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "100%",
  padding: "24px 0px",
  boxSizing: "border-box",
});

export const careSheetPageContentTitleContainer = style({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
});

export const careSheetPageContentInputContainer = style({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  width: "100%",
  backgroundColor: COLORS.white,
  borderRadius: "8px",
  padding: "16px",
  boxSizing: "border-box",
});

export const careSheetPageContentInputInput = style({
  flex: 1,
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  fontSize: "14px",
  fontWeight: 500,
  color: COLORS.gray[800],
});

export const searchResultsContainer = style({
  width: "100%",
  overflowY: "auto",
  backgroundColor: COLORS.white,
});
