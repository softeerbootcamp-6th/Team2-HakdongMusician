import { header, headerLeft, headerRight, profileImage } from "./Header.css";
import { Icon } from "@daycan/ui";

export const Header = () => {
  return (
    <div className={header}>
      <div className={headerLeft}>
        <Icon name="smallLogo" width={36} height={40} />
      </div>
      <div className={headerRight}>
        <img src="/profile-image.jpg" alt="프로필" className={profileImage} />
      </div>
    </div>
  );
};
