export const COLORS = {
  // GrayScale (회색조)
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",

  gray: {
    50: "#F3F3F5",
    100: "#E9EAEF",
    200: "#DEE0E8",
    300: "#CFD2DD",
    400: "#B0B4C1",
    500: "#898EA3",
    600: "#666D89",
    700: "#49516D",
    800: "#2E3651",
    900: "#191C28",
  },

  // Transparency (투명도)
  dim: {
    100: "rgba(25, 28, 40, 0.1)", // #191C28 with 10% opacity
    250: "rgba(25, 28, 40, 0.25)", // #191C28 with 25% opacity
    500: "rgba(25, 28, 40, 0.5)", // #191C28 with 50% opacity
    750: "rgba(25, 28, 40, 0.75)", // #191C28 with 75% opacity
  },

  // Primary (기본 색상 - 노란색 계열, 노란색 그라데이션)
  primary: {
    100: "#FFFFE1",
    200: "#FFF19F",
    300: "#FFE54F",
    gradient: "linear-gradient(180deg, #FFE54F 0%, #FFF19F 100%)",
  },

  // Chips (칩 색상)
  red: {
    200: "#FFD6DB",
    500: "#FF334B",
  },
  yellow: {
    200: "#FFEFD0",
    500: "#FEB113",
  },
  blue: {
    200: "#D8E7FB",
    500: "#3E89EA",
  },
  green: {
    200: "#D9EDDD",
    500: "#40A654",
  },
} as const;
