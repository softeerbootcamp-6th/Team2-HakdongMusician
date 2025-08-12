import { Body, COLORS } from "@daycan/ui";
import {
  HealthIndexCard,
  MealCard,
  HealthCheckCard,
  HealthImproveCard,
  CognitiveCard,
} from "../../../../client/src/pages/daily-report/components";
import type { ReportHistoryData } from "../../pages/member/components/HistoryModal/useHistoryModal";
import { reportDataViewContainer } from "./ReportDataView.css";

interface ReportDataViewProps {
  reportData: ReportHistoryData | null;
}

export const ReportDataView = ({ reportData }: ReportDataViewProps) => {
  if (!reportData) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <Body type="medium" weight={600} color={COLORS.gray[900]}>
          리포트 데이터를 불러오는 중...
        </Body>
      </div>
    );
  }

  return (
    <div className={reportDataViewContainer}>
      <Body
        type="medium"
        weight={600}
        color={COLORS.gray[900]}
        style={{ marginBottom: "16px" }}
      >
        📋 리포트 상세 내용
      </Body>

      <HealthIndexCard
        index={reportData.totalScore}
        description={`전체 점수: ${reportData.totalScore}점, 변화량: ${reportData.changeAmount}점`}
        indexCardData={[
          { title: "식사", value: reportData.mealScore },
          { title: "건강", value: reportData.healthScore },
          { title: "신체", value: reportData.physicalScore },
          { title: "인지", value: reportData.cognitiveScore },
        ]}
        isDropdown={true}
      />

      <MealCard
        isDropdown={true}
        rows={reportData.mealEntries.map((entry) => ({
          key: entry.key,
          value: entry.value,
          warningDescription: entry.warning,
        }))}
      />

      <HealthCheckCard
        isDropdown={true}
        rows={reportData.healthEntries.map((entry) => ({
          key: entry.key,
          value: entry.value,
        }))}
      />

      <HealthImproveCard
        isDropdown={true}
        columns={reportData.physicalEntries.map((entry) => ({
          key: entry.key,
          value: entry.value,
        }))}
      />

      <CognitiveCard
        isDropdown={true}
        columns={reportData.cognitiveEntries.map((entry) => ({
          key: entry.key,
          value: entry.value,
        }))}
      />
    </div>
  );
};
