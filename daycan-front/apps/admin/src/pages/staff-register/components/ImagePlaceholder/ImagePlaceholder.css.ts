import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const imagePlaceholder = style({
  width: "368px",
  height: "263px",
  borderRadius: 13.46,
  objectFit: "cover",
  border: `1px solid ${COLORS.gray[100]}`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  transition: "all 0.2s ease",
  ":hover": {
    backgroundColor: COLORS.gray[50],
  },
});
