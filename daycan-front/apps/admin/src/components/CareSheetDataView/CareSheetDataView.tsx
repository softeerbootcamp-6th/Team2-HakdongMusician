import { Body, COLORS } from "@daycan/ui";
import type { TCareSheetReadResponse } from "@/services/careSheet/types";
import { CareSheetDataSummaryCard } from "@/components/CareSheetDataSummaryCard";
import {
  MEAL_TYPE_CODE_TO_LABEL,
  MEAL_AMOUNT_CODE_TO_LABEL,
} from "@/pages/care-sheet/funnels/diagnosis-funnel/constants/diagnosis";

interface CareSheetDataViewProps {
  careSheetData: TCareSheetReadResponse | null;
}

export const CareSheetDataView = ({
  careSheetData,
}: CareSheetDataViewProps) => {
  return (
    <div>
      <Body
        type="medium"
        weight={600}
        color={COLORS.gray[900]}
        style={{ marginBottom: "16px" }}
      >
        📝 관리 기록지 상세 내용
      </Body>

      {/* 기본 정보 요약 */}
      <CareSheetDataSummaryCard
        title="기본 정보 요약"
        icon="👤"
        items={[
          {
            label: "수급자 ID",
            value: careSheetData?.memberId || "",
          },
          { label: "이용 날짜", value: careSheetData?.date || "" },
          {
            label: "시작 시간",
            value: careSheetData?.startTime || "",
          },
          {
            label: "종료 시간",
            value: careSheetData?.endTime || "",
          },
          {
            label: "이동 서비스",
            value: careSheetData?.mobilityNumber
              ? `차량번호: ${careSheetData.mobilityNumber}`
              : "미이용",
          },
        ]}
      />

      {/* 진단 정보 요약 */}
      <CareSheetDataSummaryCard
        title="진단 정보 요약"
        icon="🏥"
        items={[
          {
            label: "혈압",
            value:
              careSheetData?.healthCare?.bloodPressure?.systolic &&
              careSheetData?.healthCare?.bloodPressure?.diastolic
                ? `${careSheetData.healthCare.bloodPressure.systolic}/${careSheetData.healthCare.bloodPressure.diastolic}`
                : "측정 안함",
            unit:
              careSheetData?.healthCare?.bloodPressure?.systolic &&
              careSheetData?.healthCare?.bloodPressure?.diastolic
                ? " mmHg"
                : "",
          },
          {
            label: "체온",
            value: careSheetData?.healthCare?.temperature?.temperature || 0,
            unit: "℃",
          },
          {
            label: "소변 횟수",
            value: careSheetData?.physical?.numberOfUrine || 0,
            unit: "회",
          },
          {
            label: "대변 횟수",
            value: careSheetData?.physical?.numberOfStool || 0,
            unit: "회",
          },
        ]}
      />

      {/* 신체 활동 정보 */}
      <CareSheetDataSummaryCard
        title="신체 활동 정보"
        icon="🚶"
        items={[
          {
            label: "세면 보조",
            value: careSheetData?.physical?.assistWashing || false,
          },
          {
            label: "이동 보조",
            value: careSheetData?.physical?.assistMovement || false,
          },
          {
            label: "목욕 보조",
            value: careSheetData?.physical?.assistBathing || false,
          },
          {
            label: "목욕 시간",
            value: careSheetData?.physical?.bathingDurationMinutes
              ? `${careSheetData.physical.bathingDurationMinutes}분`
              : "없음",
          },
          {
            label: "목욕 방식",
            value: careSheetData?.physical?.bathingType || "없음",
          },
        ]}
      />

      {/* 식사 정보 */}
      <CareSheetDataSummaryCard
        title="식사 정보"
        icon="🍽️"
        items={[
          {
            label: "아침 식사",
            value: careSheetData?.physical?.breakfast?.provided
              ? `제공 (${MEAL_TYPE_CODE_TO_LABEL[careSheetData.physical.breakfast.entry.mealType] || careSheetData.physical.breakfast.entry.mealType}, ${MEAL_AMOUNT_CODE_TO_LABEL[careSheetData.physical.breakfast.entry.amount] || careSheetData.physical.breakfast.entry.amount})`
              : "미제공",
          },
          {
            label: "점심 식사",
            value: careSheetData?.physical?.lunch?.provided
              ? `제공 (${MEAL_TYPE_CODE_TO_LABEL[careSheetData.physical.lunch.entry.mealType] || careSheetData.physical.lunch.entry.mealType}, ${MEAL_AMOUNT_CODE_TO_LABEL[careSheetData.physical.lunch.entry.amount] || careSheetData.physical.lunch.entry.amount})`
              : "미제공",
          },
          {
            label: "저녁 식사",
            value: careSheetData?.physical?.dinner?.provided
              ? `제공 (${MEAL_TYPE_CODE_TO_LABEL[careSheetData.physical.dinner.entry.mealType] || careSheetData.physical.dinner.entry.mealType}, ${MEAL_AMOUNT_CODE_TO_LABEL[careSheetData.physical.dinner.entry.amount] || careSheetData.physical.dinner.entry.amount})`
              : "미제공",
          },
        ]}
      />

      {/* 추가 진단 정보 */}
      <CareSheetDataSummaryCard
        title="추가 진단 정보"
        icon="💊"
        items={[
          {
            label: "건강 관리",
            value: careSheetData?.healthCare?.healthCare || false,
          },
          {
            label: "간호 관리",
            value: careSheetData?.healthCare?.nursingCare || false,
          },
          {
            label: "응급 서비스",
            value: careSheetData?.healthCare?.emergencyService || false,
          },
        ]}
      />

      {/* 회복 프로그램 정보 */}
      <CareSheetDataSummaryCard
        title="회복 프로그램 정보"
        icon="🎯"
        items={[
          {
            label: "운동 훈련",
            value: careSheetData?.recoveryProgram?.motionTraining || false,
          },
          {
            label: "인지 프로그램",
            value: careSheetData?.recoveryProgram?.cognitiveProgram || false,
          },
          {
            label: "물리 치료",
            value: careSheetData?.recoveryProgram?.physicalTherapy || false,
          },
          {
            label: "프로그램 참여도",
            value:
              careSheetData?.recoveryProgram?.programEntries?.[0]?.score ||
              "평가 없음",
          },
        ]}
      />

      {/* 특이사항 및 코멘트 */}
      <CareSheetDataSummaryCard
        title="특이사항 및 코멘트"
        icon="📝"
        items={[
          {
            label: "신체 활동 코멘트",
            value: careSheetData?.physical?.comment || "없음",
          },
          {
            label: "인지 활동 코멘트",
            value: careSheetData?.cognitive?.comment || "없음",
          },
          {
            label: "건강 관리 코멘트",
            value: careSheetData?.healthCare?.comment || "없음",
          },
          {
            label: "회복 프로그램 코멘트",
            value: careSheetData?.recoveryProgram?.comment || "없음",
          },
        ]}
        layout="column"
      />
    </div>
  );
};
