import { Footer, Header } from "@/components";
import { container, layout } from "./mainLayout.css";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className={layout}>
      <Header />
      <div className={container}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
