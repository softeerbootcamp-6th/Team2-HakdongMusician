import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const rowInputContainer = style({
  display: "flex",
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});

export const rowInputLabelContainer = style({
  flex: 1,
});

export const rowInputValueContainer = style({
  flex: 1,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  borderRadius: "8px",
  gap: "4px",
});

export const rowInputValueInput = style({
  fontSize: "10px",
  fontWeight: "500",
  color: COLORS.gray[900],
  textAlign: "center",
  width: "36px",
  border: `1px solid ${COLORS.gray[100]}`,

  outline: "none",
  borderRadius: "8px",
  padding: "8px 10px",
});
