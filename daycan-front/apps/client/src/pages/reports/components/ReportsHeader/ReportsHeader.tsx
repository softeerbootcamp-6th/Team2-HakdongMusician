import { Body, COLORS, Icon } from "@daycan/ui";
import { useNavigate } from "react-router-dom";
import { reportsHeader } from "./ReportsHeader.css";

export const ReportsHeader = () => {
  const navigate = useNavigate();

  return (
    <div className={reportsHeader}>
      <Icon
        name="chevronLeft"
        width={24}
        height={24}
        color={COLORS.gray[50]}
        onClick={() => navigate("/")}
      />
      <Body type="medium" weight={600} color={COLORS.gray[900]}>
        리포트 모아보기
      </Body>
      <div></div>
    </div>
  );
};
