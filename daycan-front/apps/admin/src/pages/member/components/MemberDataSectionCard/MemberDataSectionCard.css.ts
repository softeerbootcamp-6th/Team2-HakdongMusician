import { style } from "@vanilla-extract/css";

export const dataSectionCardContainer = style({
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  minHeight: "250px",
});

export const dataSectionCard = style({
  display: "flex",
  flexDirection: "row",
  gap: "15px",
});

export const dataSectionCardInfo = style({
  display: "flex",
  flexDirection: "row",
  gap: "8px",
});

export const dataSectionCardInfoContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const memberAvatar = style({
  width: "90px",
  height: "120px",
  objectFit: "cover",
  borderRadius: "8px",
});

export const infoColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const Container = style({
  flex: 3,
  display: "flex",
  flexDirection: "row",
  gap: "16px",
});
