import { style } from "@vanilla-extract/css";
import { COLORS } from "../../styles/colors";

export const ITEM_HEIGHT = 44;

export const wrapper = style({
  width: "100%",
  boxSizing: "border-box",
  padding: 24,
  borderRadius: 8,
  backgroundColor: COLORS.white,
  boxShadow: "0 0 0 1px rgba(0,0,0,0.05)",
});

export const label = style({
  fontSize: 14,
  fontWeight: 600,
  color: COLORS.gray[500],
  marginBottom: 12,
});

export const wheels = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: ITEM_HEIGHT * 3, // 보여줄 3줄 (센터 + 상/하) 고정
  marginBottom: 16,
  position: "relative",
});

export const listBase = style({
  height: ITEM_HEIGHT * 3,
  overflowY: "scroll",
  scrollSnapType: "y mandatory",
  margin: 0,
  padding: `${ITEM_HEIGHT}px 0`,
  boxSizing: "border-box",
  listStyle: "none",
  selectors: {
    "&::-webkit-scrollbar": { display: "none" },
  },
});

export const listItem = style({
  height: ITEM_HEIGHT,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  lineHeight: `${ITEM_HEIGHT}px`,
  scrollSnapAlign: "center",
});

export const active = style([
  listItem,
  {
    fontWeight: 700,
    color: COLORS.gray[900],
  },
]);

export const inactive = style([
  listItem,
  {
    fontWeight: 500,
    color: COLORS.gray[400],
  },
]);

export const ampmList = style([
  listBase,
  {
    marginRight: 8,
    width: 56,
  },
]);

export const hmList = style([
  listBase,
  {
    width: 64,
  },
]);

export const colon = style({
  padding: "0 4px",
  fontSize: 20,
  fontWeight: 700,
});

export const overlay = style({
  position: "absolute",
  top: ITEM_HEIGHT,
  left: 0,
  right: 0,
  height: ITEM_HEIGHT,
  pointerEvents: "none",
  boxShadow: "inset 0 1px 0 rgba(0,0,0,0.05), inset 0 -1px 0 rgba(0,0,0,0.05)",
});
