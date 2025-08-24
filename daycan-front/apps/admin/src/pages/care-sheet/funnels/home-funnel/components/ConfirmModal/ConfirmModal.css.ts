import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const confirmModalContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  padding: "24px",
  minWidth: "320px",
  maxWidth: "400px",
});

export const confirmModalContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  textAlign: "center",
});

export const confirmModalActions = style({
  display: "flex",
  gap: "12px",
});

export const confirmModalInfo = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  padding: "16px",
  backgroundColor: COLORS.gray[50],
  borderRadius: "8px",
  border: `1px solid ${COLORS.gray[200]}`,
});

export const confirmModalInfoItem = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 0",
  borderBottom: `1px solid ${COLORS.gray[100]}`,
  ":last-child": {
    borderBottom: "none",
  },
});

export const confirmModalInfoLabel = style({
  fontSize: "14px",
  fontWeight: "500",
  color: COLORS.gray[600],
});

export const confirmModalInfoValue = style({
  fontSize: "14px",
  fontWeight: "600",
  color: COLORS.gray[800],
});
