import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const loginContainer = style({
  display: "flex",
  width: "100%",
  height: "100vh",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  background: COLORS.gray[50],

  "@media": {
    "screen and (max-width: 768px)": {
      width: "100%",
      minHeight: "600px",
      minWidth: "320px",
      backgroundColor: COLORS.white,
    },
  },
});

export const loginCard = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: "20px",
  width: "718px",
  height: "726px",

  "@media": {
    "screen and (max-width: 768px)": {
      flex: "1 1 auto",
      width: "100%",
      minHeight: "auto",
      backgroundColor: COLORS.white,
    },
  },
});

export const loginHeader = style({
  marginTop: "100px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: "16px",

  "@media": {
    "screen and (max-width: 768px)": {
      marginTop: "185px",
    },
  },
});

export const headerContent = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  margin: "0px 93px",
  marginTop: "48px",
  gap: "8px",
  width: "532px",

  "@media": {
    "screen and (max-width: 768px)": {
      width: "90%",
      minWidth: "320px",
      margin: "0px",
      marginTop: "48px",
    },
  },
});

export const inputGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const input = style({
  borderRadius: "8px",
  padding: "16px 24px",
  transition: "all 0.2s ease-in-out",
  boxSizing: "border-box",
  border: "none",
  width: "100%",
  height: "64px",
  backgroundColor: COLORS.gray[50],
  ":hover": {
    borderColor: COLORS.gray[400],
  },
});

export const forgotPassword = style({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
});

export const AreYouGuest = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "7px",
  marginTop: "117.5px",
});

export const checkContainer = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "12px",
  width: "532px",

  "@media": {
    "screen and (max-width: 768px)": {
      width: "90%",
      minWidth: "320px",
    },
  },
});

export const subDescription = style({
  color: COLORS.gray[800],
  "@media": {
    "screen and (max-width: 768px)": {
      display: "none",
    },
  },
});
