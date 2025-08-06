import { Button, COLORS, Icon } from "@daycan/ui";
import { DataSectionCard } from "@/components/DataSectionCard/DataSectionCard.tsx";
import {
  dataSectionContainer,
  dataSectionContent,
  dataSectionButtonContainer,
  dataSectionTopButton,
  dataSectionBottomButton,
} from "./DataSection.css.ts";
import type { ElderInfo, Guardian } from "@/types/elder.ts";

interface DataSectionProps {
  member?: ElderInfo;
  guardian?: Guardian;
}

export const DataSection = ({ member, guardian }: DataSectionProps) => {
  return (
    <div className={dataSectionContainer}>
      <div className={dataSectionContent}>
        <DataSectionCard type="member" memberInfo={member} />
        <DataSectionCard type="guardian" guardianInfo={guardian} />
        <div className={dataSectionButtonContainer}>
          <div className={dataSectionTopButton}>
            <Button
              size="fullWidth"
              style={{ backgroundColor: COLORS.gray[600], color: COLORS.white }}
            >
              기록지 및 리포트 내역
              <Icon name="arrowRight" stroke="currentColor" />
            </Button>
          </div>
          <div className={dataSectionBottomButton}>
            <Button
              size="small"
              style={{
                backgroundColor: COLORS.green[500],
                color: COLORS.green[200],
                width: "58px",
                height: "32px",
              }}
            >
              수정
            </Button>
            <Button
              variant="error"
              size="small"
              style={{ width: "58px", height: "32px" }}
            >
              삭제
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
