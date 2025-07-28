import { createTheme } from "@vanilla-extract/css";
import { COLORS } from "./colors";

const [theme, vars] = createTheme({
  color: COLORS,
});

export const THEME = theme;
export const COLOR_VARS = vars.color;
