import {
  detailCardLayout,
  detailCardLayoutHeader,
  detailCardLayoutContent,
  detailCardLayoutAvatar,
} from "./DetailCardLayout.css";

interface DetailCardLayoutProps {
  children: React.ReactNode;
  dataCategory: string;
  dataAvatarUrl: string;
}
export const DetailCardLayout = ({
  children,
  dataCategory,
  dataAvatarUrl,
}: DetailCardLayoutProps) => {
  return (
    <div className={detailCardLayout}>
      <div className={detailCardLayoutHeader}>{dataCategory}</div>
      <div className={detailCardLayoutContent}>
        <img
          src={dataAvatarUrl}
          alt="dataAvatar"
          className={detailCardLayoutAvatar}
        />
        {children}
      </div>
    </div>
  );
};
