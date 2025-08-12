import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const historyModalContainer = style({
  width: "840px",
  height: "600px",
});

export const historyModalHeader = style({
  display: "flex",
  width: "100%",
  height: "64px",
  backgroundColor: COLORS.gray[700],
  borderRadius: "8px 8px 0 0",
  padding: "16px 24px",
  justifyContent: "space-between",
  alignItems: "center",
});

export const historyModalHeaderLeft = style({
  display: "flex",
  alignItems: "center",
  gap: "16px",
});

export const historyModalHeaderRight = style({
  width: "167px",
  height: "40px",
  borderRadius: "50px",
  display: "flex",
  alignItems: "center",
  backgroundColor: COLORS.gray[600],
  padding: "8px 12px",
  boxSizing: "border-box",
  gap: "8px",
});

export const historyModalHeaderRightProfile = style({
  width: "32px",
  height: "32px",
  border: `1px solid ${COLORS.gray[300]}`,
  borderRadius: "50%",
});

export const historyModalHeaderDateSelect = style({
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  boxSizing: "border-box",
});

export const historyModalContentContainer = style({
  display: "flex",
  height: "500px",
  flexDirection: "row",
  gap: "24px",
  padding: "0px 24px 48px 24px",
});

export const historyModalContentLeft = style({
  display: "flex",
  width: "287px",
  height: "100%",
  padding: "24px 16px",
  borderRadius: "12px",
  boxSizing: "border-box",
  flexDirection: "column",
  backgroundColor: COLORS.gray[50],
  gap: "16px",
});

export const historyModalContentRight = style({
  display: "flex",
  width: "489px",
  height: "100%",
  backgroundColor: COLORS.gray[50],
  borderRadius: "12px",
  padding: "24px 16px",
  boxSizing: "border-box",
});

// 새로 추가된 스타일들
export const dateSelectContainer = style({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  justifyContent: "center",
  width: "100%",
});

export const monthSelector = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "120px",
});

export const monthButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  borderRadius: "4px",
  transition: "background-color 0.2s",
  ":hover": {
    backgroundColor: COLORS.gray[100],
  },
});

export const dateListContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "8px",
  padding: "16px 0",
});

export const dateItem = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  cursor: "pointer",
  transition: "all 0.2s",
  border: `1px solid ${COLORS.gray[200]}`,
  backgroundColor: COLORS.white,
  ":hover": {
    backgroundColor: COLORS.gray[100],
    borderColor: COLORS.gray[300],
  },
});

export const dateItemActive = style({
  backgroundColor: COLORS.primary[300],
  borderColor: COLORS.primary[300],
  color: COLORS.white,
});

// 새로운 Left 영역 스타일들
export const dateStatusListContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "16px 0",
  maxHeight: "400px",
  overflowY: "auto",
});

export const dateStatusItem = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  padding: "16px",
  backgroundColor: COLORS.white,
  borderRadius: "8px",
  border: `1px solid ${COLORS.gray[200]}`,
});

export const dateStatusHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
});

export const dateStatusAttendance = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  backgroundColor: COLORS.green[500],
  color: COLORS.white,
});

export const dateStatusContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const statusItem = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  padding: "8px 12px",
  backgroundColor: COLORS.gray[50],
  borderRadius: "6px",
});

export const confirmButton = style({
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  padding: "4px 8px",
  borderRadius: "4px",
  transition: "background-color 0.2s",
  ":hover": {
    backgroundColor: COLORS.gray[100],
  },
});

export const reportContainer = style({
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  width: "100%",
});
