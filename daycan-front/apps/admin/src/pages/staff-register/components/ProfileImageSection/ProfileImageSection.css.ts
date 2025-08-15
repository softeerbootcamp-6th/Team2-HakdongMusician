import { style } from "@vanilla-extract/css";

export const profileImageSectionContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
  width: "368px",
  height: "100%",
  marginLeft: "28px",
});

export const profileImageSectionHeader = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  boxSizing: "border-box",
});

export const profileImageSectionImage = style({
  width: "100%",
  height: "263px",
  objectFit: "cover",
  borderRadius: 13.46,
});

export const profileImageSectionDeleteButton = style({
  position: "absolute",
  top: 12,
  right: 12,
});

export const dragDropArea = style({
  position: "relative",
  borderRadius: "8px",
  transition: "border-color 0.2s ease",
  cursor: "pointer",
  ":hover": {
    borderColor: "#007bff",
  },
});

export const dragOverArea = style({
  borderColor: "#007bff",
  backgroundColor: "rgba(0, 123, 255, 0.05)",
});

export const dragDropText = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "rgba(0, 123, 255, 0.9)",
  color: "white",
  padding: "10px 20px",
  borderRadius: "20px",
  fontSize: "14px",
  zIndex: 1,
});
