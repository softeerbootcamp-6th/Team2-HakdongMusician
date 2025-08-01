import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  backgroundColor: COLORS.white,
  borderBottom: `1px solid ${COLORS.gray[200]}`,
});

export const headerLeft = style({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

export const headerRight = style({
  display: "flex",
  alignItems: "center",
});

export const profileImage = style({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  objectFit: "cover",
});
