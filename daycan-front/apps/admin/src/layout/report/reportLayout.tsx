import { Outlet } from "react-router-dom";
import {
  container,
  sidebarWrapper,
  sidebar,
  reportSectionWrapper,
  reportSection,
} from "./reportLayout.css";

/**
 * 리포트 레이아웃입니다. 메인 레이아웃과 동일하지만,
 * reportSection은 한 번 더 나누기에 너비를 100%로 조정합니다.
 * @author 홍규진
 */
export const ReportLayout = () => {
  return (
    <div className={container}>
      <div className={sidebarWrapper}>
        <div className={sidebar}>
          <h2>하이 사이드바</h2>
        </div>
      </div>
      <div className={reportSectionWrapper}>
        <main className={reportSection}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
