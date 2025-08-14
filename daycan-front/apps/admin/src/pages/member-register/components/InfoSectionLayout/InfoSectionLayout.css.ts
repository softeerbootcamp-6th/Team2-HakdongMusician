import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const infoSectionLayoutContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

export const infoSectionLayoutContent = style({
  display: "flex",
  flexDirection: "row",
  gap: 104,
  padding: "0px 57px",
  paddingTop: "60px",
  boxSizing: "border-box",
  borderRadius: 8,
  backgroundColor: COLORS.white,
  width: "1084px",
  height: "100%",
});

export const infoSectionLayoutProfileHeader = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  boxSizing: "border-box",
});

export const infoSectionLayoutProfile = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
  width: "391px",
  height: "430px",
});

export const infoSectionLayoutProfileImage = style({
  width: "100%",
  height: "263px",
  objectFit: "cover",
  borderRadius: 13.46,
});

export const infoSectionLayoutProfilePlaceholder = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "263px",
  backgroundColor: COLORS.white,
  borderRadius: 12,
  border: `1px solid ${COLORS.gray[100]}`,
  transition: "all 0.2s ease",
  cursor: "pointer",
  ":hover": {
    backgroundColor: COLORS.gray[50],
  },
});

export const infoSectionLayoutDeleteButton = style({
  position: "absolute",
  top: "14px",
  right: "14px",
  cursor: "pointer",
});
