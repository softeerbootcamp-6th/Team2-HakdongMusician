import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const sidebarContent = style({
  width: "100%",
  height: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: "0px 12px",
  alignItems: "center",
  gap: "24px",
  boxSizing: "border-box",
  backgroundColor: COLORS.gray[700],
  minWidth: "256px",
});

// Header styles
export const sidebarHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  color: "white",
  marginTop: "48px",
  width: "100%",
});

// Menu Section styles
export const sidebarMenu = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "32px",
});

export const menuSectionTitle = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const menuItemWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const menuItem = style({
  display: "flex",
  borderRadius: "6px",
  transition: "background-color 0.2s ease",
  justifyContent: "center",
  gap: "8px",
  width: "132px",
});
