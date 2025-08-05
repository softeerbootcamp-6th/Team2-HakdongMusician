import { style } from "@vanilla-extract/css";

export const statisticsPageContainer = style({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  gap: 20,
});

export const statisticsHeader = style({
  display: "flex",
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 5,

  height: "64px",
  boxSizing: "border-box",
});

export const statisticsCalendarContainer = style({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 16,

  boxSizing: "border-box",
});

export const statisticsCalendarDateContainer = style({
  display: "flex",
  width: "100%",
  padding: "0 16px",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
});

export const statisticsChartContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: 40,
  boxSizing: "border-box",
});

export const clickableIcon = style({
  cursor: "pointer",
  transition: "opacity 0.2s ease",
  ":hover": {
    opacity: 0.7,
  },
});
