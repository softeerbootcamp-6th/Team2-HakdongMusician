import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const recordsSection = style({
  width: "100%",
  maxWidth: "358px",
  padding: "16px 0px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
});

export const cardsContainer = style({
  display: "grid",
  marginTop: "12px",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
});

export const card = style({
  backgroundColor: COLORS.white,
  borderRadius: "12px",
  minHeight: "160px",
  padding: "20px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});
