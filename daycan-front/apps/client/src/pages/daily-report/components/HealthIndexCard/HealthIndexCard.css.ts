import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = style({
  display: "flex",
  width: "100%",
  height: "100%",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
  backgroundColor: COLORS.white,
  padding: "16px 20px",
  borderRadius: 16,
  boxSizing: "border-box",
});

export const healthIndexHeader = recipe({
  base: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    alignSelf: "start",
    gap: 8,
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

export const arrowIconContainer = style({
  display: "flex",
  alignItems: "end",
  justifyContent: "end",
  flex: 1,
});

export const indexChartDescription = style({
  marginTop: 12,
  textAlign: "center",
});

export const indexChartDescriptionContainer = style({
  display: "flex",
  maxWidth: 300,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
});

export const indexCardContainer = style({
  display: "flex",
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: COLORS.white,
  borderRadius: 9,
  boxSizing: "border-box",
  marginTop: 15,
  gap: 2,
});

export const indexCard = style({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${COLORS.gray[100]}`,
  padding: "8px 10px",
  borderRadius: 9,
  gap: 5,
});

export const indexValue = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
});

export const indexDescription = style({
  marginTop: 18,
});

export const dropdownContent = recipe({
  base: {
    overflow: "hidden",
    transition: "max-height 0.3s ease-out, opacity 0.3s ease-out",
  },
  variants: {
    isExpanded: {
      true: {
        maxHeight: "1000px",
        opacity: "1",
      },
      false: {
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
