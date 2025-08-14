import { Body, COLORS, Icon } from "@daycan/ui";
import { infoFunnelHeaderContainer } from "./InfoFunnelHeader.css";
import { useNavigate } from "react-router-dom";

export const InfoFunnelHeader = () => {
  const navigate = useNavigate();
  return (
    <div className={infoFunnelHeaderContainer}>
      <Icon
        name="chevronLeft"
        width={24}
        height={24}
        color={COLORS.gray[50]}
        onClick={() => {
          navigate("/care-sheet/new");
        }}
      />
      <Body type="medium" color={COLORS.gray[900]} weight={600}>
        기본 정보
      </Body>
      <div></div>
    </div>
  );
};
