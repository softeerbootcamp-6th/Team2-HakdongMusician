import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { COLORS } from "@daycan/ui";

export const columnTextArea = style({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "100%",
  boxSizing: "border-box",
  border: "none",
  backgroundColor: COLORS.white,
  borderRadius: "16px",

  color: COLORS.gray[900],
});

export const columnTextAreaInput = style({
  resize: "none",
  outline: "none",
  fontFamily: "Pretendard",
  fontSize: "14px",
  fontWeight: "400",
  whiteSpace: "pre-line",
  border: "none",
  height: "100px",
});

export const columnTextAreaValueCounter = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
});

export const columnTextAreaAutoSelectTag = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "4px",
});

export const columnTextAreaAutoSelectTagTitle = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "4px",
});

export const autoTag = recipe({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "4px",
    padding: "4px 8px",
    borderRadius: "16px",
  },
  variants: {
    isGood: {
      true: {
        backgroundColor: COLORS.blue[200],
      },
      false: {
        backgroundColor: COLORS.red[200],
      },
    },
  },
});
