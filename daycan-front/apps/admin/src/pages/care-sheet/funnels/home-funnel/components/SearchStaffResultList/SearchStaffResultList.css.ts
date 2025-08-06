import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const searchResultList = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: "100%",
  overflowY: "auto",
  backgroundColor: COLORS.gray[50],
});

export const searchResultItem = style({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  backgroundColor: COLORS.white,
  border: `1px solid ${COLORS.gray[100]}`,

  ":hover": {
    backgroundColor: COLORS.gray[50],
  },

  selectors: {
    '&[data-selected="true"]': {
      backgroundColor: COLORS.gray[200],
    },
  },
});

export const profileImage = style({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  overflow: "hidden",
  backgroundColor: COLORS.gray[200],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

export const profileImageImg = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const defaultAvatar = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: COLORS.gray[200],
});

export const userInfo = style({
  flex: 1,
  display: "flex",
  alignItems: "center",
});

export const roleTag = style({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
});
