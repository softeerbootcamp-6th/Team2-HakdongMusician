import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const immediateSendModalContainer = style({
  display: "flex",
  flexDirection: "column",
  padding: "24px",
  boxSizing: "border-box",
  backgroundColor: COLORS.white,
  borderRadius: 12,
  width: 716,
  height: 181,
  gap: 8,
});

export const immediateSendModalButtonContainer = style({
  display: "flex",
  flex: 1,
  flexDirection: "row",
  alignItems: "flex-end",
  gap: 10,
  justifyContent: "flex-end",
});
