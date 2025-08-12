import { COLORS } from "@daycan/ui";
import { style } from "@vanilla-extract/css";

export const summaryCardContainer = style({
  marginBottom: "20px",
  padding: "16px",
  border: `1px solid ${COLORS.gray[200]}`,
  borderRadius: "8px",
  backgroundColor: COLORS.white,
});

export const summaryCardTitle = style({
  marginBottom: "12px",
});

export const summaryCardItemsGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "8px",
});

export const summaryCardItemsColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const summaryCardItem = style({
  // 기본 스타일은 Body 컴포넌트에서 처리되므로 여기서는 추가 스타일만 정의
});

// 3열 그리드용 스타일
export const summaryCardItemsGrid3 = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "8px",
});

// 4열 그리드용 스타일
export const summaryCardItemsGrid4 = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "8px",
});
