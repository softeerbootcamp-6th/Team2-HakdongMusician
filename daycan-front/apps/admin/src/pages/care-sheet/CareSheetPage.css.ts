import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const careSheetContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "1084px",
  boxSizing: "border-box",
});

export const careSheetActiveTabContainer = style({
  display: "flex",
  marginTop: "40px",
  flexDirection: "row",
  alignItems: "center",

  gap: "16px",
});

export const careSheetActiveTabItemContainer = recipe({
  base: {
    display: "flex",
    width: "155px",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px",
    gap: "8px",
  },
  variants: {
    active: {
      true: {
        borderBottom: `2px solid ${COLORS.gray[600]}`,
      },
      false: {
        color: COLORS.gray[50],
      },
    },
  },
});
