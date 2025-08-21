import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "0px",
  marginTop: "10px",
});

export const headerContainer = style({
  display: "flex",
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});

export const sectionTitle = style({
  marginTop: "10px",
  marginBottom: "10px",
  padding: "8px 16px",
  boxSizing: "border-box",
  borderBottom: `2px solid ${COLORS.gray[600]}`,
  width: "156px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
});

export const headerButton = style({
  marginTop: "17px",
  width: "fit-content",
  padding: "6px 16px",
  boxSizing: "border-box",
  borderRadius: "8px",
  border: `1px solid ${COLORS.gray[200]}`,
  backgroundColor: "transparent",
  cursor: "pointer",
  transition: "all 0.2s ease",
  selectors: {
    "&:hover": {
      backgroundColor: COLORS.gray[200],
    },
  },
});

export const itemsContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "200px",
  overflowY: "scroll",
  gap: "0px",
  padding: "0px 10px 0px 16px",
  marginTop: "8px",
  boxSizing: "border-box",
  borderRadius: "8px",
  backgroundColor: COLORS.white,
});
