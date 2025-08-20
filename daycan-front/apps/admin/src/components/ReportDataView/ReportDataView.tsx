import { Body, COLORS } from "@daycan/ui";
import {
  HealthIndexCard,
  MealCard,
  HealthCheckCard,
  HealthImproveCard,
  CognitiveCard,
} from "../../../../client/src/pages/daily-report/components";
import { reportDataViewContainer } from "./ReportDataView.css";
import type { TReportReadResponse } from "@/services/report/types";

interface ReportDataViewProps {
  reportData: TReportReadResponse | null;
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
        📋 리포트 상세 내용 (실제 모바일 앱 화면)
      </Body>

      <HealthIndexCard
        index={reportData.totalScore}
        description={`전체 점수: ${reportData.totalScore}점, 변화량: ${reportData.changeAmount}점`}
        changeAmount={reportData.changeAmount}
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
        score={reportData.mealCardFooter?.score ?? 15}
        additionalMemo={reportData.mealCardFooter?.additionalMemo ?? ""}
      />

      <HealthCheckCard
        isDropdown={true}
        rows={reportData.healthEntries.map((entry) => ({
          key: entry.key,
          value: entry.value,
        }))}
        score={reportData.healthCardFooter?.score ?? 15}
        additionalMemo={reportData.healthCardFooter?.additionalMemo ?? ""}
      />

      <HealthImproveCard
        isDropdown={true}
        columns={reportData.physicalEntries.map((entry) => ({
          key: entry.key,
          value: entry.value,
        }))}
        score={reportData.physicalCardFooter?.score ?? 15}
        additionalMemo={reportData.physicalCardFooter?.additionalMemo ?? ""}
      />

      <CognitiveCard
        isDropdown={true}
        columns={reportData.cognitiveEntries.map((entry) => ({
          key: entry.key,
          value: entry.value,
        }))}
        score={reportData.cognitiveCardFooter?.score ?? 15}
        additionalMemo={reportData.cognitiveCardFooter?.additionalMemo ?? ""}
      />
    </div>
  );
};
