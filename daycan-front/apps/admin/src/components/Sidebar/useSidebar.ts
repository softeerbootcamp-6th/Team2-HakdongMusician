import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PAGE_KEYS, type PageKey } from "@/constants/sidebar.ts";

export const useSidebar = (initialMenu: PageKey = PAGE_KEYS.CARE_SHEET) => {
  const [selectedMenu, setSelectedMenu] = useState<PageKey>(initialMenu);
  const [count] = useState<number>(5);
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로에 따라 선택된 메뉴 동기화
  useEffect(() => {
    const currentPath = location.pathname;
    switch (currentPath) {
      case "/member":
        setSelectedMenu(PAGE_KEYS.RECIPIENT);
        break;
      case "/report":
        setSelectedMenu(PAGE_KEYS.REPORT_SENDING);
        break;
      case "/care-sheet":
        setSelectedMenu(PAGE_KEYS.CARE_SHEET);
        break;
      default:
        break;
    }
  }, [location.pathname]);

  const handleNewRecordClick = () => {
    // 새 기록지 작성 로직을 여기에 추가
    console.log("새 기록지 작성 클릭");
  };

  const handleMenuClick = (menuName: PageKey) => {
    setSelectedMenu(menuName);

    // 메뉴에 따라 페이지 라우팅
    switch (menuName) {
      case PAGE_KEYS.RECIPIENT:
        navigate("/member");
        break;
      case PAGE_KEYS.CARE_SHEET:
        navigate("/care-sheet");
        break;
      case PAGE_KEYS.REPORT_SENDING:
        navigate("/report");
        break;
      case PAGE_KEYS.STAFF:
        // 종사자 관리 페이지가 구현되면 추가
        console.log("종사자 관리 페이지로 이동");
        break;
      default:
        break;
    }
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
