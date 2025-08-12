import { style } from "@vanilla-extract/css";
import { COLORS } from "../../styles";
import { recipe, RecipeVariants } from "@vanilla-extract/recipes";

export const overlayStyle = style({
  position: "fixed",
  inset: 0,
  backgroundColor: COLORS.dim[500],
  zIndex: 1000,
});

export const hidden = style({
  display: "none",
});

export const titleStyle = style({
  fontSize: "16px",
  fontWeight: "600",
  color: COLORS.gray[900],
});

export const contentStyle = style({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: COLORS.white,
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  minWidth: "300px",
  zIndex: 1001,
});
