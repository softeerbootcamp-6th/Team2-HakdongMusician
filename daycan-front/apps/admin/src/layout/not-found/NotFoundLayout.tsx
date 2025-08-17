import { Outlet } from "react-router-dom";
import { container, contentWrapper, mobileHeader } from "./NotFoundLayout.css";
import { Icon } from "@daycan/ui";

export const NotFoundLayout = () => {
  return (
    <div className={container}>
      <div className={mobileHeader}>
        <Icon name="smallLogo" width={37} height={40} />
        <img
          src="/images/profile.png"
          alt="profile"
          style={{ borderRadius: "50%", width: 40, height: 40 }}
        />
      </div>
      <div className={contentWrapper}>
        <Outlet />
      </div>
    </div>
  );
};
