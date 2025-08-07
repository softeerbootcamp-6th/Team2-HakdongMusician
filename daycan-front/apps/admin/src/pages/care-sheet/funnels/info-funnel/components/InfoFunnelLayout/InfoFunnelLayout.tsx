import { InfoFunnelHeader } from "../InfoFunnelHeader/InfoFunnelHeader";
import { infoFunnelLayoutContainer } from "./InfoFunnelLayout.css";

export const InfoFunnelLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className={infoFunnelLayoutContainer}>
      <InfoFunnelHeader />
      {children}
    </div>
  );
};
