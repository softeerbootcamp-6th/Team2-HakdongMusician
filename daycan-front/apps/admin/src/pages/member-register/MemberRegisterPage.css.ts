import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const memberRegisterPageContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: 58,
  marginTop: 84,
});

export const memberRegisterPageHeader = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 24,
});

export const memberRegisterPageHeaderTitle = style({
  display: "flex",
  flexDirection: "row",
  gap: 8,
  alignItems: "center",
});

export const memberRegisterPageHeaderDescription = style({
  display: "flex",
  backgroundColor: COLORS.white,
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "77px",
  borderRadius: 8,
});

export const memberRegisterPageContent = style({
  display: "flex",
  flexDirection: "column",
  gap: 60,
});

export const memberRegisterPageReportContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

export const memberRegisterPageReportContent = style({
  display: "flex",
  backgroundColor: COLORS.white,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: 8,
  height: "88px",
  padding: "0 32px",
  boxSizing: "border-box",
});

export const memberRegisterPageReportLeftContent = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 16,
});

export const memberRegisterPageButtonContainer = style({
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: 100,
});
