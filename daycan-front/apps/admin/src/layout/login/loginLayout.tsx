import { Outlet } from "react-router-dom";
import { container, section } from "./LoginLayout.css";
import { Footer } from "@/components/Footer";

export const LoginLayout = () => {
  return (
    <div className={container}>
      <main className={section}>
        <Outlet />
      </main>

      {/* 푸터 컴포넌트*/}
      <Footer />
    </div>
  );
};
