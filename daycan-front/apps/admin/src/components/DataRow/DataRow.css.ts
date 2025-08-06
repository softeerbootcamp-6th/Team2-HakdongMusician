import { style, keyframes } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

const slideDown = keyframes({
  "0%": {
    maxHeight: "0px",
    opacity: "0",
    transform: "translateY(-10px)",
  },
  "100%": {
    maxHeight: "600px",
    opacity: "1",
    transform: "translateY(0)",
  },
});

const slideUp = keyframes({
  "0%": {
    maxHeight: "600px",
    opacity: "1",
    transform: "translateY(0)",
  },
  "100%": {
    maxHeight: "0px",
    opacity: "0",
    transform: "translateY(-10px)",
  },
});

export const dataRowContainer = style({
  display: "flex",
  flexDirection: "column",
  backgroundColor: COLORS.white,
  borderRadius: "8px",
  maxWidth: "1084px",
  width: "100%",
  boxSizing: "border-box",
});

export const dataRow = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "52px",
  padding: "10px 16px",
  boxSizing: "border-box",
});

export const dataColumn = style({
  textAlign: "center",
});

export const dataActionColumn = style({
  width: "100px",
  display: "flex",
  justifyContent: "flex-end",
});

export const dataDetailContainer = style({
  overflow: "hidden",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  maxHeight: "0px",
  opacity: "0",
  transform: "translateY(-10px)",
  marginTop: "0px",
});

export const dataDetailContainerOpen = style({
  animation: `${slideDown} 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
  marginTop: "8px",
});

export const dataDetailContainerClosed = style({
  animation: `${slideUp} 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
});
