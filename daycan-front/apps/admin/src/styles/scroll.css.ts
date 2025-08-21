import { style } from "@vanilla-extract/css";

// overlay-scroll 스타일 추가
export const overlayScroll = style({
  // 스크롤바 자체를 얇게
  "::-webkit-scrollbar": {
    width: "8px",
  },

  // 스크롤 thumb (잡는 부분)
  "::-webkit-scrollbar-thumb": {
    background: "rgba(0, 0, 0, 0.4)",
    borderRadius: "4px",
  },

  // 스크롤바 트랙 투명하게 (배경 없앰)
  "::-webkit-scrollbar-track": {
    background: "transparent",
  },
});
