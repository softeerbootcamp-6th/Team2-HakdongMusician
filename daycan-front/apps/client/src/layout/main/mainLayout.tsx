import { Footer, Header } from "@/components";
import { container, layout, wrapper } from "./mainLayout.css";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className={layout}>
      <Header />
      <div className={wrapper}>
        <div className={container}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};
