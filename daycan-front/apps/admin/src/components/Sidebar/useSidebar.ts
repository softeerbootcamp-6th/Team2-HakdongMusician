import { useState } from "react";
import { PAGE_KEYS, type PageKey } from "@/constants/sidebar.ts";

export const useSidebar = (initialMenu: PageKey = PAGE_KEYS.RECORD_SHEET) => {
  const [selectedMenu, setSelectedMenu] = useState<PageKey>(initialMenu);
  const [count] = useState<number>(5);
  const handleNewRecordClick = () => {
    // 새 기록지 작성 로직을 여기에 추가
    console.log("새 기록지 작성 클릭");
  };

  const handleMenuClick = (menuName: PageKey) => {
    setSelectedMenu(menuName);
  };

  const isMenuSelected = (menuName: PageKey) => {
    return selectedMenu === menuName;
  };

  return {
    selectedMenu,
    handleMenuClick,
    isMenuSelected,
    count,
    handleNewRecordClick,
  };
};
