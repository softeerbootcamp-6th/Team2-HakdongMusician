import { useState } from "react";

export const PAGE_KEYS = {
  RECORD_SHEET: "기록지 관리",
  REPORT_SENDING: "리포트 전송",
  RECIPIENT: "수급자 관리",
  STAFF: "종사자 관리",
} as const;

export type PageKey = (typeof PAGE_KEYS)[keyof typeof PAGE_KEYS];

// 사이드바 텍스트 상수들
export const SIDEBAR_TEXTS = {
  CENTER_NAME: "데이케어센터과천점마공원점",
  DOCUMENT_MANAGEMENT: "서류 관리",
  PERSON_MANAGEMENT: "사람 관리",
  NEW_RECORD_BUTTON: "새 기록지 작성",
  REQUIRED_WRITING: "작성 필요",
  DATE_DELAYED: "날짜 지연",
  SENDING_REQUIRED: "전송 필요",
  CASE_COUNT: "건",
} as const;

export const useSidebar = (initialMenu: PageKey = PAGE_KEYS.RECORD_SHEET) => {
  const [selectedMenu, setSelectedMenu] = useState<PageKey>(initialMenu);
  const [count, setCount] = useState<number>(5);

  const handleMenuClick = (menuName: PageKey) => {
    setSelectedMenu(menuName);
  };

  const isMenuSelected = (menuName: PageKey) => {
    return selectedMenu === menuName;
  };

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return {
    selectedMenu,
    handleMenuClick,
    isMenuSelected,
    count,
    PAGE_KEYS,
    SIDEBAR_TEXTS,
  };
};
