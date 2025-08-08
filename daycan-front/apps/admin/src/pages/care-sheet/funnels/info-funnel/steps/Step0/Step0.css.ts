import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const step0InputContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "56px",
  padding: "16px",
  boxSizing: "border-box",
  borderRadius: "8px",
  backgroundColor: COLORS.white,
});

export const step0Input = style({
  flex: 1,
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  fontSize: "17px",
  fontWeight: 500,
  color: COLORS.gray[800],
});
