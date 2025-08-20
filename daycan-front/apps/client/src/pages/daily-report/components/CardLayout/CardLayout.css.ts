import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const cardLayout = style({
  width: "100%",
  padding: "12px 10px",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "start",
  justifyContent: "space-between",
  flexDirection: "column",
  gap: 12,
  backgroundColor: COLORS.white,
  borderRadius: 16,
});

export const cardLayoutHeader = recipe({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    gap: 8,
    width: "100%",
  },
  variants: {
    isDropdown: {
      true: {
        cursor: "pointer",
        userSelect: "none",
      },
      false: {},
    },
  },
});

export const cardLayoutFooter = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "start",
  gap: 13,
  width: "100%",
});

export const cardLayoutFooterStampContainer = style({
  display: "flex",
  width: 38,
  alignItems: "center",
  justifyContent: "center",
});

export const cardLayoutFooterStampDescription = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "center",
  gap: 4,
});
export const content = style({
  overflow: "hidden",
  width: "100%",
  transition: "max-height 0.3s ease-out, opacity 0.3s ease-out",
  flex: 1,
  padding: "12px 10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
  gap: 12,
});
export const dropdownContent = recipe({
  base: {
    width: "100%",
    overflow: "hidden",
    transition: "max-height 0.3s ease-out, opacity 0.3s ease-out",
    flex: 1,
    padding: "12px 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    gap: 12,
  },
  variants: {
    isExpanded: {
      true: {
        maxHeight: "1000px",
        opacity: "1",
      },
      false: {
        display: "none",
        maxHeight: "0",
        opacity: "0",
      },
    },
  },
});

export const arrowIcon = recipe({
  base: {
    transition: "transform 0.3s ease",
  },
  variants: {
    isExpanded: {
      true: {
        transform: "rotate(180deg)",
      },
      false: {
        transform: "rotate(0deg)",
      },
    },
  },
});

export const overflowMessage = style({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  borderRadius: "16px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  zIndex: 10,

  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
});

export const arrowIconContainer = style({
  display: "flex",
  alignItems: "end",
  justifyContent: "end",
  flex: 1,
});
