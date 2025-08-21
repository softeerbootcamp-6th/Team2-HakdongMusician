import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PAGE_KEYS, type PageKey } from "@/constants/sidebar.ts";
import { useGetDocumentCountQuery } from "@/services/document/useDocumentQuery";
import { TODAY_DATE } from "@/utils/dateFormatter";

export const useSidebar = (initialMenu: PageKey = PAGE_KEYS.CARE_SHEET) => {
  const [selectedMenu, setSelectedMenu] = useState<PageKey>(initialMenu);
  const { data: documentCount } = useGetDocumentCountQuery(TODAY_DATE);
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
      case "/":
        setSelectedMenu(PAGE_KEYS.CARE_SHEET);
        break;
      case "/staff":
        setSelectedMenu(PAGE_KEYS.STAFF);
        break;
      default:
        break;
    }
  }, [location.pathname]);

  const handleNewRecordClick = () => {
    navigate("/care-sheet/new");
  };

  const handleMenuClick = (menuName: PageKey) => {
    setSelectedMenu(menuName);

    // 메뉴에 따라 페이지 라우팅
    switch (menuName) {
      case PAGE_KEYS.RECIPIENT:
        navigate("/member");
        break;
      case PAGE_KEYS.CARE_SHEET:
        navigate("/");
        break;
      case PAGE_KEYS.REPORT_SENDING:
        navigate("/report");
        break;
      case PAGE_KEYS.STAFF:
        navigate("/staff");
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
    documentCount,
    handleNewRecordClick,
  };
};
