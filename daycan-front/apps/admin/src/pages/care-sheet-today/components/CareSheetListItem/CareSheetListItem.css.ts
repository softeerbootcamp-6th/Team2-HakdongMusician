import { style } from "@vanilla-extract/css";

export const careSheetListItemContainer = style({
  display: "flex",
  flexDirection: "row",
  padding: "4px 8px",
  gap: 10,
});

export const careSheetListItemInfoContainer = style({
  flex: 1,
});

export const careSheetListItemProfile = style({
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  overflow: "hidden",
});

export const careSheetListItemStatusContainer = style({
  display: "flex",
  flexDirection: "row",
  gap: 4,
});
