import { Outlet } from "react-router-dom";
import {
  container,
  sidebar,
  mainSectionWrapper,
  mainSection,
  sidebarWrapper,
} from "./mainLayout.css";
import { Sidebar, MobileAccessGuard } from "@/components";

/**
 * 메인 레이아웃입니다. 최소 너비 및 높이를 기준으로 레이아웃을 구성합니다.
 * @author 홍규진
 */
export const MainLayout = () => {
  return (
    <MobileAccessGuard>
      <div className={container}>
        <div className={sidebarWrapper}>
          <div className={sidebar}>
            <Sidebar />
          </div>
        </div>
        <div className={mainSectionWrapper}>
          <main className={mainSection}>
            <Outlet />
          </main>
        </div>
      </div>
    </MobileAccessGuard>
  );
};
