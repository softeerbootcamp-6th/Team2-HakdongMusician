import { PageToolbar } from "@/components/PageToolbar";
import { Body, Heading, COLORS } from "@daycan/ui";
import { careSheetContainer } from "./CareSheetPage.css";
import { CareSheetList } from "./components/CareSheetList";
import {
  mockCareSheetPendingDoneList,
  mockCareSheetNotApplicableList,
} from "./constants/dummy";

export const CareSheetPage = () => {
  // 출석인원 처리 (결석 처리)
  const handleProcessApplicable = (checkedIds: number[]) => {
    console.log("결석 처리할 ID들:", checkedIds);
    // TODO: API 요청 보내기
    // 예: updateCareSheetStatus()
  };

  // 결석인원 처리 (출석 처리)
  const handleProcessNotApplicable = (checkedIds: number[]) => {
    console.log("출석 처리할 ID들:", checkedIds);
    // TODO: API 요청 보내기
    // 예: updateCareSheetStatus()
  };

  return (
    <div className={careSheetContainer}>
      <PageToolbar>
        <Heading>기록지 관리</Heading>
      </PageToolbar>

      <Body type="small" weight={400} color={COLORS.gray[600]}>
        작성 필요 상태의 기록지는 매일 자정 작성 지연으로 전환되고 말일이 지나면
        모든 지연된 기록지는 여기서 사라져요.
      </Body>

      {/* 출석 인원 */}
      <CareSheetList
        careSheets={mockCareSheetPendingDoneList}
        status="APPLICABLE"
        onProcessItems={handleProcessApplicable}
      />

      {/* 결석 인원 */}
      <CareSheetList
        careSheets={mockCareSheetNotApplicableList}
        status="NOT_APPLICABLE"
        onProcessItems={handleProcessNotApplicable}
      />
    </div>
  );
};
