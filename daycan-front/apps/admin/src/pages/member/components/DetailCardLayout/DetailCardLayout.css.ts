import { style } from "@vanilla-extract/css";

export const detailCardLayout = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const detailCardLayoutHeader = style({
  display: "flex",
  flexDirection: "row",
  gap: "16px",
});

export const detailCardLayoutContent = style({
  display: "flex",
  flexDirection: "row",
  gap: "20px",
});

export const detailCardLayoutAvatar = style({
  width: "90px",
  height: "120px",
  objectFit: "cover",
  borderRadius: "9px",
});
