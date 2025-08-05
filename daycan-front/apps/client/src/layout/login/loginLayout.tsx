import { layout } from "./loginLayout.css";
import { Outlet } from "react-router-dom";

export const LoginLayout = () => {
  return (
    <div className={layout}>
      <Outlet />
    </div>
  );
};
