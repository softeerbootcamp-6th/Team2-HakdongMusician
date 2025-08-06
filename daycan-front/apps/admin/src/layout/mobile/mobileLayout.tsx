import { layout } from "./mobileLayout.css";
import { Outlet } from "react-router-dom";

export const MobileLayout = () => {
  return (
    <div className={layout}>
      <Outlet />
    </div>
  );
};
